import React, { useEffect, useState } from "react";
import { BadgeCheck, X } from "lucide-react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!viewStory) return;

    let timer, progressInterval;
    setProgress(0);

    const duration =
      viewStory.media_type === "video" ? 15000 : 10000;
    const step = 100;
    let elapsed = 0;

    progressInterval = setInterval(() => {
      elapsed += step;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, step);

    timer = setTimeout(() => {
      setViewStory(null);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  if (!viewStory) return null;

  return (
    <div
      className="fixed inset-0 h-screen z-50 flex items-center justify-center bg-black"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "#000",
      }}
    >
      {/* Progress bar */}
      {viewStory.media_type !== "video" && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Media */}
      {viewStory.media_type === "image" && (
        <img
          src={viewStory.media_url}
          alt="story"
          className="max-h-full max-w-full object-contain"
        />
      )}

      {viewStory.media_type === "video" && (
        <video
          src={viewStory.media_url}
          autoPlay
          controls
          className="max-h-full max-w-full object-contain"
        />
      )}

      {viewStory.media_type === "text" && (
        <p className="text-white text-xl text-center px-6">
          {viewStory.content}
        </p>
      )}

      {/* User info */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 backdrop-blur-2xl rounded bg-black/50">
        <img
          src={viewStory.user?.profile_picture}
          alt="profile"
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => setViewStory(null)}
        className="absolute top-4 right-4 text-white"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>
    </div>
  );
};

export default StoryViewer;
