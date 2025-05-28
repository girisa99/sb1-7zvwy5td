import { supabase } from '../../lib/supabase';
import type { RAGContent, Category } from '../../types/chat';

class ContentService {
  async getPendingContent(): Promise<RAGContent[]> {
    try {
      const { data, error } = await supabase
        .from('rag_content')
        .select('*')
        .eq('status', 'pending_review')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return this.removeDuplicates(data || []);
    } catch (error) {
      console.error('Error fetching pending content:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('rag_categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async approveContent(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('rag_content')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error approving content:', error);
      throw error;
    }
  }

  async rejectContent(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('rag_content')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error rejecting content:', error);
      throw error;
    }
  }

  private removeDuplicates(content: RAGContent[]): RAGContent[] {
    return content.reduce((acc: RAGContent[], current: RAGContent) => {
      const isDuplicate = acc.some(item => 
        item.query.toLowerCase() === current.query.toLowerCase() ||
        item.response.toLowerCase() === current.response.toLowerCase()
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
  }
}

export const contentService = new ContentService();