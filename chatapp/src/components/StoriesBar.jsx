import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModel from "./StoryModel";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory,setViewStory]=useState(null);
  useEffect(() => {
    // Fetch or load dummy stories
    setStories(dummyStoriesData);
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl overflow-x-auto no-scrollbar px-4">
      <div className="flex gap-4 pb-5">

        {/* Add Story */}
        <div
          onClick={() => setShowModal(true)}
          className="relative min-w-[120px] max-h-40 aspect-[3/4]
                     rounded-lg border-2 border-dashed border-indigo-300
                     bg-gradient-to-b from-indigo-50 to-white
                     flex flex-col items-center justify-center
                     cursor-pointer hover:shadow-lg transition"
        >
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mb-2">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-slate-700">Create Story</p>
        </div>

        {/* Stories */}
        {stories.map((story) => (
          <div
            onClick={()=>setViewStory(story)}
            key={story._id}
            className="relative min-w-[120px] max-h-40 aspect-[3/4]
                       rounded-lg overflow-hidden
                       shadow-sm hover:shadow-lg
                       transition cursor-pointer group"
          >
            {/* Base Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-500 to-purple-600" />

            {/* Media */}
            {story.media_type !== "text" && (
              <div className="absolute inset-0 z-10 overflow-hidden">
                {story.media_type === "image" ? (
                  <img
                    src={story.media_url}
                    alt="story"
                    className="h-full w-full object-cover
                               opacity-80 group-hover:scale-110
                               transition duration-500"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    muted
                    autoPlay
                    loop
                    playsInline
                    poster={story.thumbnail}
                    className="h-full w-full object-cover
                               opacity-80 group-hover:scale-110
                               transition duration-500"
                  />
                )}
              </div>
            )}

            {/* User Avatar */}
            <img
              src={story.user.profile_picture}
              alt={story.user.name}
              className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full ring-2 ring-white shadow"
            />

            {/* Story Text */}
            <p className="absolute top-14 left-2 right-2 z-20
                          text-white text-xs line-clamp-2">
              {story.content}
            </p>

            {/* Time */}
            <p className="absolute bottom-2 left-2 z-20
                          text-white/80 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {showModal && <StoryModel setShowModal={setShowModal} />}
      {/* view Story Modal */}
      {
         viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>
      }
    </div>
  );
};

export default StoriesBar;
