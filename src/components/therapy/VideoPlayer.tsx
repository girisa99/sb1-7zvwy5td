import React from 'react';
import { youtubeService } from '../../services';

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const embedUrl = youtubeService.getEmbedUrl(videoId);
  
  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}