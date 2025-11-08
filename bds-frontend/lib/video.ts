// Video utility functions for handling different video providers

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
