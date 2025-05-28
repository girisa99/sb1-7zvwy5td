import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = 'AIzaSyBb0HaTQU1MQMry6eaDisWFuXZVaIsPTRs';

export async function getVideoDetails(videoId: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    const data = await response.json();
    return data.items[0]?.snippet;
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}

export function getVideoIdFromUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
}