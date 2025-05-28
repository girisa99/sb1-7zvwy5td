import { supabase } from '../../lib/supabase';
import type { ChatMessage, LLMModel, ModelSelectionMode } from '../../types/chat';

class ChatService {
  async sendMessage(
    content: string,
    mode: ModelSelectionMode,
    selectedModels: LLMModel[],
    previousMessages: ChatMessage[]
  ): Promise<ChatMessage> {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [...previousMessages, { role: 'user', content }],
          models: selectedModels,
          mode
        }
      });

      if (error) throw error;

      return {
        role: 'assistant',
        content: data.response,
        model: data.model
      };
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  async getComparisonResponses(
    content: string,
    models: [LLMModel, LLMModel],
    previousMessages: ChatMessage[]
  ): Promise<ChatMessage[]> {
    try {
      const responses = await Promise.all(
        models.map(model => 
          supabase.functions.invoke('chat', {
            body: {
              messages: [...previousMessages, { role: 'user', content }],
              models: [model]
            }
          })
        )
      );

      return responses.map((response, index) => ({
        role: 'assistant',
        content: response.data.response,
        model: models[index]
      }));
    } catch (error) {
      console.error('Comparison chat error:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();