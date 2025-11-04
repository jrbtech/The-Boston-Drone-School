// Video hosting service for managing video URLs from various providers

export interface VideoProvider {
  name: 'youtube' | 'vimeo' | 'direct';
  videoId: string;
  embedUrl: string;
}

/**
 * Parse a video URL and return the embed URL
 * Supports YouTube, Vimeo, and direct video URLs
 */
export function getVideoEmbedUrl(videoUrl: string): string {
  if (!videoUrl) {
    return '';
  }

  // YouTube
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = extractYouTubeVideoId(videoUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
  }

  // Vimeo
  if (videoUrl.includes('vimeo.com')) {
    const videoId = extractVimeoVideoId(videoUrl);
    return videoId ? `https://player.vimeo.com/video/${videoId}` : videoUrl;
  }

  // Already an embed URL or direct video file
  return videoUrl;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract Vimeo video ID from URL
 */
function extractVimeoVideoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validate if a URL is a valid video URL
 */
export function isValidVideoUrl(url: string): boolean {
  if (!url) return false;

  return (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com') ||
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.ogg')
  );
}

/**
 * Get video provider information from URL
 */
export function getVideoProvider(url: string): VideoProvider | null {
  if (!url) return null;

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = extractYouTubeVideoId(url);
    return videoId
      ? {
          name: 'youtube',
          videoId,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        }
      : null;
  }

  if (url.includes('vimeo.com')) {
    const videoId = extractVimeoVideoId(url);
    return videoId
      ? {
          name: 'vimeo',
          videoId,
          embedUrl: `https://player.vimeo.com/video/${videoId}`,
        }
      : null;
  }

  return {
    name: 'direct',
    videoId: '',
    embedUrl: url,
  };
}

export default {
  getVideoEmbedUrl,
  isValidVideoUrl,
  getVideoProvider,
};
