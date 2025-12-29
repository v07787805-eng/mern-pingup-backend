import React, { useState, useEffect, useRef } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react'

const ProfileModal = ({ setShowEdit }) => {
  const user = dummyUserData

  const coverInputRef = useRef(null)
  const avatarInputRef = useRef(null)

  const [editForm, setEditForm] = useState({
    username: user.username || '',
    bio: user.bio || '',
    location: user.location || '',
    full_name: user.full_name || '',
    profile_picture: null,
    cover_photo: null, // FIXED NAME
  })

  const [avatarPreview, setAvatarPreview] = useState(
    user.profile_picture || '/default-avatar.png'
  )

  const [coverPreview, setCoverPreview] = useState(
    user.cover_photo || '/default-cover.jpg' // ✅ FIXED NAME
  )

  /* Avatar Preview */
  useEffect(() => {
    if (!editForm.profile_picture) return
    const url = URL.createObjectURL(editForm.profile_picture)
    setAvatarPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [editForm.profile_picture])

  /* Cover Preview */
  useEffect(() => {
    if (!editForm.cover_photo) return
    const url = URL.createObjectURL(editForm.cover_photo)
    setCoverPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [editForm.cover_photo])

  const handleSaveProfile = (e) => {
    e.preventDefault()
    console.log(editForm)
    setShowEdit(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">

          {/* Cover Photo */}
          <div className="cursor-pointer relative h-44 group">
            <img
              src={coverPreview}
              alt="cover"
              className="cursor-pointer absolute inset-0 w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() => coverInputRef.current.click()}
              className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40"
            >
              <Pencil className="w-6 h-6 text-white" />
            </button>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  cover_photo: e.target.files[0], // ✅ FIXED
                })
              }
            />
          </div>

          {/* Avatar */}
          <div className="relative px-6">
            <div className="relative -mt-12 w-24 h-24 rounded-full border-4 border-white group">
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />

              <button
                type="button"
                onClick={() => avatarInputRef.current.click()}
                className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 rounded-full"
              >
                <Pencil className="w-5 h-5 text-white" />
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profile_picture: e.target.files[0],
                  })
                }
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveProfile} className="p-6 space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className="w-full p-3 border rounded-lg"
                value={editForm.full_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, full_name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="w-full p-3 border rounded-lg"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                className="w-full p-3 border rounded-lg"
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                className="w-full p-3 border rounded-lg"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
