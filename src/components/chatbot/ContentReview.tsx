import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Tag, FileText, Link as LinkIcon } from 'lucide-react';
import { useChatStore } from '../../stores/chat.store';
import { RAGContent } from '../../types/chat';
import { Link } from 'react-router-dom';

export function ContentReview() {
  const { pendingContent, categories, fetchPendingContent, fetchCategories, approveContent, rejectContent } = useChatStore();

  useEffect(() => {
    fetchPendingContent();
    fetchCategories();
  }, [fetchPendingContent, fetchCategories]);

  if (!pendingContent.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No content pending review
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingContent.map((content: RAGContent) => (
        <motion.div
          key={content.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Query</h3>
              <p className="mt-1 text-sm text-gray-600">{content.query}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => approveContent(content.id)}
                className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                title="Approve"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => rejectContent(content.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                title="Reject"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Generated Response</h3>
            <p className="mt-1 text-sm text-gray-600">{content.response}</p>
          </div>

          {content.title && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Title</h3>
              <p className="mt-1 text-sm text-gray-600">{content.title}</p>
            </div>
          )}

          {content.summary && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Summary</h3>
              <p className="mt-1 text-sm text-gray-600">{content.summary}</p>
            </div>
          )}

          {content.category_id && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <p className="mt-1 text-sm text-gray-600">
                {categories.find(cat => cat.id === content.category_id)?.name || 'Unknown Category'}
              </p>
            </div>
          )}

          {content.tags && content.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Tags</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {content.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Context</h3>
            <div className="mt-1 text-xs text-gray-500">
              {content.context.fda && (
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  FDA data available
                </div>
              )}
              {content.context.icd && (
                <div className="flex items-center text-blue-600">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  ICD codes available
                </div>
              )}
            </div>
          </div>

          {content.slug && (
            <div className="mt-4 flex items-center text-sm text-primary-600">
              <LinkIcon className="w-4 h-4 mr-1" />
              <Link to={`/blog/post/${content.slug}`} className="hover:underline">
                View Published Post
              </Link>
            </div>
          )}

          <div className="mt-2 text-xs text-gray-400">
            Created: {new Date(content.created_at).toLocaleString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
}