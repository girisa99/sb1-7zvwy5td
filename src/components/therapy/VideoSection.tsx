import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { youtubeService } from '../../services';

interface Video {
  title: string;
  url: string;
  description?: string;
}

interface VideoSectionProps {
  videos: Video[];
}

export function VideoSection({ videos }: VideoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, index) => {
        const videoId = youtubeService.getVideoIdFromUrl(video.url);
        if (!videoId) return null;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {video.title}
              </h3>
              {video.description && (
                <div className="flex items-start space-x-2 text-gray-600">
                  <Info size={16} className="flex-shrink-0 mt-1" />
                  <p className="text-sm">{video.description}</p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}