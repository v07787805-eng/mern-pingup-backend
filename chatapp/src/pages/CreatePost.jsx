import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { X, Image } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const user = dummyUserData

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages((prev) => [...prev, ...files])
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // ✅ MUST return a Promise for toast.promise
  const handleSubmit = async () => {
    if (!content && images.length === 0) {
      throw new Error('Post cannot be empty')
    }

    setLoading(true)

    // simulate API request
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // reset form
    setContent('')
    setImages([])
    setLoading(false)
  }

  const onPost = () => {
    toast.promise(handleSubmit(), {
      loading: 'Uploading...',
      success: 'Post added successfully!',
      error: (err) => err.message || 'Post not added',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Post
          </h1>
          <p className="text-slate-600">
            Share your thoughts with the world
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4">

          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_picture}
              alt="profile"
              className="w-12 h-12 rounded-full shadow"
            />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full resize-none max-h-32 mt-4 text-sm outline-none placeholder-gray-400"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded-md"
                  />

                  <div
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/40 rounded-md cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <Image className="w-6 h-6" />
              Add images
            </label>

            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageChange}
            />

            <button
              disabled={loading || (!content && images.length === 0)}
              onClick={onPost}
              className="cursor-pointer bg-indigo-600 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePost
