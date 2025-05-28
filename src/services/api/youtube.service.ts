import { config } from '../config';

class YouTubeService {
  private apiKey: string;

  constructor() {
    this.apiKey = config.google.youtube.apiKey;
  }

  async getVideoDetails(videoId: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${this.apiKey}`
      );
      const data = await response.json();
      return data.items[0]?.snippet;
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  }

  getVideoIdFromUrl(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
  }
}

export const youtubeService = new YouTubeService();