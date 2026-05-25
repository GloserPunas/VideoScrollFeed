'use client';

import { useRef, useEffect, useState } from 'react';
import { Video } from '../../types/Video';
import { Heart, MessageCircle, Pause, Play, Share2,
    Volume2,
    VolumeX
 } from 'lucide-react';
import { formatTime } from '../../utils/time';

interface Props {
  video: Video;
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(video.likesCount);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    //const [isDragging, setIsDragging] = useState(false);

    const [isPlaying, setIsPlaying] = useState(true);

    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const updateProgress = () => {
            setCurrentTime(videoEl.currentTime);
        };

        //const handleLoadedMetadata = () => {
          //  setDuration(videoEl.duration);
        //};

        setDuration(videoEl.duration);

        videoEl.addEventListener('timeupdate', updateProgress);
        //videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);

        videoEl.muted = isMuted;

        if (isActive) {
            videoEl.currentTime = 0;
            videoEl.play().catch(() => {});
        } else {
            videoEl.pause();
            videoEl.currentTime = 0;
        }

        return () => {
            videoEl.removeEventListener('timeupdate', updateProgress);
            //videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [isActive]);

    const togglePlay = () => {
        const videoEl = videoRef.current;
        if (!videoEl) return;
        if (videoEl.paused) {
            videoEl.play();
            setIsPlaying(true);
        } else {
            videoEl.pause();
            setIsPlaying(false);
        }
    };

  const toggleLike = () => {
    if (isLiked) {
      setLikes(l => l - 1);
    } else {
      setLikes(l => l + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const videoEl = videoRef.current;
    if (!videoEl || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    
    videoEl.currentTime = percentage * duration;
  };
  const toggleMute = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-screen snap-start bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted={isMuted}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        playsInline
      />

      <div className="absolute bottom-16 left-0 right-0 z-30 px-6">
        <div className="flex items-center gap-3 text-white text-xs">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
          <span>{formatTime(currentTime)}</span>
          
          <div 
            className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer relative group"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-1 bg-white rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform"
              style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          <span>{formatTime(duration)}</span>

          <button 
            onClick={toggleMute} 
            className="ml-2 p-2 hover:bg-white/20 rounded-full transition-colors"
            title={isMuted ? "Bật tiếng" : "Tắt tiếng"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div className="absolute bottom-28 left-6 text-white z-10 max-w-[70%]">
        <p className="font-semibold text-lg hover:underline cursor-pointer">{video.authorName}</p>
        <p className="text-sm mt-1 line-clamp-2">{video.description}</p>
      </div>

      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 text-white z-20">
        <button onClick={toggleLike} className="flex flex-col items-center">
          <div className={`group p-3 rounded-full transition-colors duration-300 ${isLiked ? 'bg-red-500' : 'bg-black-secondary hover:bg-black-third'}`}>
            <Heart className={`w-7 h-7 transition-colors duration-300 ${isLiked ? 'fill-white' : 'group-hover:fill-red-500 group-hover:text-red-500'}`} />
          </div>
          <span className="text-sm mt-1">{likes.toLocaleString()}</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-black-secondary">
            <MessageCircle className="w-7 h-7" />
          </div>
          <span className="text-sm mt-1">Comment</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-black-secondary">
            <Share2 className="w-7 h-7" />
          </div>
          <span className="text-sm mt-1">Share</span>
        </button>
      </div>
    </div>
  );
}