export const config = {
  app: {
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  },
  google: {
    youtube: {
      apiKey: import.meta.env.VITE_YOUTUBE_API_KEY
    }
  }
};