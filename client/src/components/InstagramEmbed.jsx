import React, { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramEmbed({ 
  videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-glitter-makeup-40156-large.mp4",
  instagramUrl = "https://www.instagram.com/reel/DY13BkgShZL/"
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay blocked or failed:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Playback failed:", err));
      }
    }
  };

  return (
    <div 
      className="relative w-[280px] aspect-[9/16] bg-black overflow-hidden shadow-lg border border-primary/10 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      {/* Autoplay Video Tag */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
      />

      {/* Elegant Overlay Grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 transition-opacity duration-300">
        
        {/* Top Bar: Instagram Badge & Link */}
        <div className="flex justify-between items-center">
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-2.5 py-1.5 hover:bg-accent hover:text-primary transition-all duration-300 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <InstagramIcon size={10} />
            <span>View Reel</span>
          </a>
        </div>

        {/* Play/Pause Micro-indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-500 transform ${isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100 group-hover:scale-110"}`}>
            {isPlaying ? <Pause size={20} strokeWidth={1.5} /> : <Play size={20} strokeWidth={1.5} fill="currentColor" />}
          </div>
        </div>

        {/* Bottom Bar: Instructions */}
        <div className="text-left">
          <span className="text-[9px] text-white/50 uppercase tracking-widest font-semibold block mb-1">
            Hover to Play
          </span>
          <p className="text-[11px] text-white font-medium tracking-wide leading-relaxed font-body">
            @mallukbykanikaa
          </p>
        </div>
      </div>
    </div>
  );
}
