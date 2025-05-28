import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import OpenAI from "npm:openai@4.28.0";
import Anthropic from "npm:@anthropic-ai/sdk@0.10.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': [
    'authorization',
    'x-client-info',
    'apikey',
    'content-type',
    'x-api-key',
    'x-goog-api-key',
    'x-anthropic-api-key',
    'x-openai-api-key'
  ].join(', '),
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Validate environment variables
function validateEnvironment() {
  const requiredEnvVars = {
    GEMINI_API_KEY: Deno.env.get('GEMINI_API_KEY'),
    OPENAI_API_KEY: Deno.env.get('OPENAI_API_KEY'),
    ANTHROPIC_API_KEY: Deno.env.get('ANTHROPIC_API_KEY'),
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return requiredEnvVars;
}

async function generateGeminiResponse(messages: any[]) {
  try {
    const { GEMINI_API_KEY } = validateEnvironment();
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role,
        parts: msg.content
      }))
    });
    
    const result = await chat.sendMessage(messages[messages.length - 1].content);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

async function generateGPTResponse(messages: any[]) {
  try {
    const { OPENAI_API_KEY } = validateEnvironment();
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 2000
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    if (error.status === 429) {
      throw new Error('OpenAI API rate limit exceeded');
    }
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

async function generateClaudeResponse(messages: any[]) {
  try {
    const { ANTHROPIC_API_KEY } = validateEnvironment();
    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
    
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      messages: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      max_tokens: 2000,
      temperature: 0.7
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Anthropic API Error:', error);
    if (error.status === 429) {
      throw new Error('Anthropic API rate limit exceeded');
    }
    throw new Error(`Anthropic API error: ${error.message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate request content type
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: { message: 'Content-Type must be application/json', code: 'INVALID_CONTENT_TYPE' } }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate environment variables before processing
    try {
      validateEnvironment();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: { message: error.message, code: 'CONFIGURATION_ERROR' } }),
        { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const { query, mode, models, previousMessages } = await req.json();
    
    // Validate required parameters
    if (!query) {
      return new Response(
        JSON.stringify({ error: { message: 'Query parameter is required', code: 'MISSING_QUERY' } }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    if (!mode) {
      return new Response(
        JSON.stringify({ error: { message: 'Mode parameter is required', code: 'MISSING_MODE' } }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    if (!models || !Array.isArray(models) || models.length === 0) {
      return new Response(
        JSON.stringify({ error: { message: 'Models parameter must be a non-empty array', code: 'INVALID_MODELS' } }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate message history size
    if (previousMessages && previousMessages.length > 50) {
      return new Response(
        JSON.stringify({ error: { message: 'Too many previous messages', code: 'MESSAGE_HISTORY_TOO_LARGE' } }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const messages = [...(previousMessages || []), { role: 'user', content: query }];

    let response;
    let selectedModel;

    if (mode === 'system') {
      try {
        // Use all models and combine responses
        const results = await Promise.allSettled([
          generateGeminiResponse(messages),
          generateGPTResponse(messages),
          generateClaudeResponse(messages)
        ]);

        // Filter successful responses
        const successfulResponses = results
          .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
          .map(result => result.value);

        if (successfulResponses.length === 0) {
          return new Response(
            JSON.stringify({ error: { message: 'All AI models failed to generate responses', code: 'ALL_MODELS_FAILED' } }),
            { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }

        // Combine successful responses
        const summaryPrompt = `
          Analyze and combine these AI responses into a comprehensive answer:
          ${successfulResponses.map((res, i) => `Model ${i + 1}: ${res}`).join('\n')}
        `;

        const { GEMINI_API_KEY } = validateEnvironment();
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const summary = await model.generateContent(summaryPrompt);
        response = summary.response.text();
        selectedModel = 'system';
      } catch (error) {
        console.error('System mode error:', error);
        return new Response(
          JSON.stringify({ error: { message: 'Failed to process system mode', code: 'SYSTEM_MODE_ERROR' } }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    } else {
      // Single model mode
      const model = models[0];
      try {
        switch (model) {
          case 'gemini':
            response = await generateGeminiResponse(messages);
            break;
          case 'gpt':
            response = await generateGPTResponse(messages);
            break;
          case 'claude':
            response = await generateClaudeResponse(messages);
            break;
          default:
            return new Response(
              JSON.stringify({ error: { message: `Unsupported model: ${model}`, code: 'UNSUPPORTED_MODEL' } }),
              { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
        }
        selectedModel = model;
      } catch (error) {
        console.error(`${model} API error:`, error);
        return new Response(
          JSON.stringify({ error: { message: error.message, code: 'MODEL_API_ERROR' } }),
          { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        response,
        model: selectedModel
      }),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    
    return new Response(
      JSON.stringify({
        error: {
          message: 'An unexpected error occurred',
          code: 'INTERNAL_ERROR',
          details: error.message
        }
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});