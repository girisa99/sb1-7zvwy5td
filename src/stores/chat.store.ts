import { create } from 'zustand';
import { ChatMessage, LLMModel, ModelSelectionMode, ComparisonView, RAGContent, Category } from '../types/chat';
import { llmService } from '../services/api/llm.service';
import { contentService } from '../services/api/content.service';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  selectionMode: ModelSelectionMode;
  selectedModels: LLMModel[];
  comparisonView: ComparisonView;
  pendingContent: RAGContent[];
  categories: Category[];
  sendMessage: (content: string) => Promise<void>;
  setSelectionMode: (mode: ModelSelectionMode) => void;
  setSelectedModels: (models: LLMModel[]) => void;
  enableComparisonView: (models: [LLMModel, LLMModel]) => void;
  disableComparisonView: () => void;
  clearMessages: () => void;
  fetchPendingContent: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  approveContent: (id: string) => Promise<void>;
  rejectContent: (id: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  selectionMode: 'system',
  selectedModels: ['gemini', 'gpt', 'claude'],
  comparisonView: {
    isEnabled: false,
    models: ['gemini', 'gpt']
  },
  pendingContent: [],
  categories: [],

  sendMessage: async (content: string) => {
    try {
      set({ isLoading: true, error: null });
      const { selectionMode, selectedModels, messages } = get();

      const userMessage: ChatMessage = {
        role: 'user',
        content
      };

      set(state => ({
        messages: [...state.messages, userMessage]
      }));

      const response = await llmService.processQuery(
        content,
        selectionMode,
        selectedModels,
        { previousMessages: messages }
      );

      set(state => ({
        messages: [...state.messages, response]
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectionMode: (mode) => {
    set({ 
      selectionMode: mode,
      selectedModels: mode === 'system' ? ['gemini', 'gpt', 'claude'] : ['gemini'],
      comparisonView: { isEnabled: false, models: ['gemini', 'gpt'] }
    });
  },

  setSelectedModels: (models) => {
    set({ selectedModels: models });
  },

  enableComparisonView: (models) => {
    set({ 
      comparisonView: { 
        isEnabled: true, 
        models 
      },
      messages: []
    });
  },

  disableComparisonView: () => {
    set({ 
      comparisonView: { 
        isEnabled: false, 
        models: ['gemini', 'gpt'] 
      },
      messages: []
    });
  },

  clearMessages: () => {
    set({ 
      messages: [], 
      error: null
    });
  },

  fetchPendingContent: async () => {
    try {
      set({ isLoading: true, error: null });
      const content = await contentService.getPendingContent();
      set({ pendingContent: content });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pending content';
      console.error('Error fetching pending content:', errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const categories = await contentService.getCategories();
      set({ categories });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      console.error('Error fetching categories:', error);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  approveContent: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await contentService.approveContent(id);
      await get().fetchPendingContent();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to approve content';
      console.error('Error approving content:', error);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  rejectContent: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await contentService.rejectContent(id);
      await get().fetchPendingContent();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reject content';
      console.error('Error rejecting content:', error);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  }
}));