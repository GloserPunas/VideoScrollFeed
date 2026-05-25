'use client';

import { useState, useEffect } from 'react';
import { mockVideos } from '@/constants/mockVideos';
import VideoCard  from './VideoCard';
export default function VideoFeed() {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveVideoIndex(index);
          }
        });
      },
      { threshold: 0.7 }
    );

    const videoSections = document.querySelectorAll('.video-section');
    videoSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-feed h-screen overflow-y-scroll snap-y snap-mandatory">
        {mockVideos.map((video, index) => (
            <div
            key={video.id}
            data-index={index}
            className="video-section h-screen w-full snap-start"
            >
                <VideoCard
                video={video}
                isActive={index === activeVideoIndex}
                />
            </div>
        ))}
    </div>
  );
}