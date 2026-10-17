/**
 * Utility functions for optimizing Unsplash and remote images for mobile devices.
 * Compresses and resizes images dynamically via URL parameters to reduce bandwidth
 * and maintain 60fps rendering on mobile GPUs.
 */

export const getOptimizedImageUrl = (url, width = 800, quality = 75) => {
  if (!url || typeof url !== 'string') return url;
  
  // If it's an Unsplash URL, replace or append width and quality parameters
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', String(width));
      urlObj.searchParams.set('q', String(quality));
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    } catch {
      // Fallback for simple string replacement if URL parsing fails
      return url.replace(/w=\d+/, `w=${width}`).replace(/q=\d+/, `q=${quality}`);
    }
  }

  return url;
};

/**
 * Returns a responsive srcSet string for an Unsplash image URL.
 */
export const getResponsiveSrcSet = (url) => {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  return `${getOptimizedImageUrl(url, 480, 70)} 480w, ${getOptimizedImageUrl(url, 800, 75)} 800w, ${getOptimizedImageUrl(url, 1200, 80)} 1200w, ${getOptimizedImageUrl(url, 1920, 80)} 1920w`;
};
