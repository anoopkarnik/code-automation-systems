import React from 'react';

const YouTubeChannelEmbed = ({ channelId }:any) => {
  const embedUrl = `https://www.youtube.com/embed?listType=user_uploads&list=${channelId}`;

  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Channel"
      ></iframe>
    </div>
  );
};

export default YouTubeChannelEmbed;
