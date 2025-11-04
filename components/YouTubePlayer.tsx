import React from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
  if (!videoId) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white p-4 text-center">
        <p>لم يتم تحديد الفيديو لهذا الدرس.</p>
      </div>
    );
  }

  // Use youtube-nocookie.com for enhanced privacy and to potentially avoid some browser restrictions.
  // rel=0: Don't show related videos from other channels at the end.
  const videoSrc = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        key={videoId} // The key is crucial to force the iframe to reload when the videoId changes
        className="w-full h-full"
        src={videoSrc}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
