import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Share2, MessageCircle, ThumbsUp, Calendar, User, Tag } from 'lucide-react';

export function RagContentPage() {
  const { slug } = useParams();
  const [content, setContent] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [slug]);

  const fetchContent = async () => {
    try {
      const { data: contentData, error: contentError } = await supabase
        .from('rag_content')
        .select(`
          *,
          category:rag_categories(*),
          author:user_profiles(*)
        `)
        .eq('slug', slug)
        .single();

      if (contentError) throw contentError;
      setContent(contentData);

      // Fetch comments
      const { data: commentsData } = await supabase
        .from('rag_comments')
        .select(`
          *,
          user:user_profiles(*)
        `)
        .eq('content_id', contentData.id)
        .order('created_at', { ascending: false });

      setComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await supabase.functions.invoke('sync-linkedin', {
        body: { content_id: content.id, action: 'share' }
      });
      // Refresh content to get updated share status
      fetchContent();
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Content not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(content.published_at).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {content.author?.first_name} {content.author?.last_name}
              </span>
              {content.category && (
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                  {content.category.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {content.tags?.map((tag: string, index: number) => (
                <span key={index} className="flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  <Tag className="w-4 h-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content.response }} />
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  <span>Like</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  <span>{comments.length} Comments</span>
                </button>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share on LinkedIn
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Comments</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.user?.first_name} {comment.user?.last_name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}