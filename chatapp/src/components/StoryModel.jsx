import React, { useState } from "react";
import { ArrowLeft, Sparkles, Upload } from "lucide-react";
import toast from "react-hot-toast";

const StoryModel = ({ setShowModal }) => {
  const bgColors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];

  const [mode, setMode] = useState("text"); // text | image | video
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // ✅ Promise-based function for toast
  const handleCreateStory = async () => {
    if (mode === "text" && !text.trim()) {
      throw new Error("Text is empty");
    }

    if (mode !== "text" && !media) {
      throw new Error("Please upload a file");
    }

    // simulate api delay
    await new Promise((res) => setTimeout(res, 1500));

    return true;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 text-white">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setShowModal(false)} className="p-2">
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-8" />
        </div>

        {/* Mode Switch */}
        <div className="flex gap-2 mb-4">
          {["text", "image", "video"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setMode(item);
                setMedia(null);
                setPreviewUrl(null);
              }}
              className={`flex-1 py-1 rounded capitalize text-sm
                ${mode === item ? "bg-indigo-600" : "bg-gray-700"}
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* TEXT MODE */}
        {mode === "text" && (
          <div
            className="h-52 rounded-lg flex items-center justify-center p-3 mb-3"
            style={{ background }}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something..."
              className="w-full h-full bg-transparent resize-none outline-none text-white text-center"
            />
          </div>
        )}

        {/* MEDIA MODE */}
        {mode !== "text" && (
          <>
            <label
              htmlFor="mediaUpload"
              className="h-52 mb-3 border-2 border-dashed border-gray-600 rounded-lg
                         flex flex-col items-center justify-center cursor-pointer
                         hover:border-indigo-500 transition"
            >
              {!previewUrl ? (
                <>
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">
                    Click to upload {mode}
                  </p>
                </>
              ) : mode === "image" ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="max-h-full rounded object-contain"
                />
              ) : (
                <video
                  src={previewUrl}
                  controls
                  className="max-h-full rounded object-contain"
                />
              )}
            </label>

            <input
              id="mediaUpload"
              type="file"
              accept={mode === "image" ? "image/*" : "video/*"}
              onChange={handleMediaUpload}
              hidden
            />
          </>
        )}

        {/* BACKGROUND COLORS */}
        {mode === "text" && (
          <div className="flex gap-2 mb-4">
            {bgColors.map((color) => (
              <button
                key={color}
                onClick={() => setBackground(color)}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-full border-2
                  ${background === color ? "border-white" : "border-transparent"}
                `}
              />
            ))}
          </div>
        )}

        {/* CREATE BUTTON */}
        <div className="flex justify-end">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded flex items-center gap-2"
            onClick={() =>
              toast.promise(handleCreateStory(), {
                loading: "Saving...",
                success: "Story Added 🎉",
                error: (e) => e.message,
              })
            }
          >
            <Sparkles size={18} />
            Create Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModel;
