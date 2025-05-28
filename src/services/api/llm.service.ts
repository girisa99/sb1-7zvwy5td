import { supabase } from '../../lib/supabase';
import { ChatMessage, LLMModel, ModelSelectionMode } from '../../types/chat';

interface ProcessQueryOptions {
  previousMessages: ChatMessage[];
}

class LLMService {
  async processQuery(
    content: string,
    selectionMode: ModelSelectionMode,
    selectedModels: LLMModel[],
    options: ProcessQueryOptions
  ): Promise<ChatMessage> {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          query: content,
          mode: selectionMode,
          models: selectedModels,
          previousMessages: options.previousMessages
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to process query');
      }

      if (!data || !data.response) {
        throw new Error('Invalid response from chat function');
      }

      return {
        role: 'assistant',
        content: data.response,
        model: data.model
      };
    } catch (error) {
      console.error('Error processing query:', error);
      
      // Check if the error is from the edge function
      if (error.message?.includes('Missing required environment variables')) {
        throw new Error('Chat service configuration error. Please contact support.');
      }
      
      // Handle rate limiting or quota errors
      if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
        throw new Error('Service is temporarily unavailable. Please try again later.');
      }

      // Handle model-specific errors
      if (error.message?.includes('API error')) {
        throw new Error('AI model service is currently unavailable. Please try a different model.');
      }

      throw new Error('Failed to process query. Please try again.');
    }
  }
}

export const llmService = new LLMService();