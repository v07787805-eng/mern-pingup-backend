import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileinfo from '../components/UserProfileinfo'
import PostCard from '../components/PostCard'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {
  const { profileId } = useParams()

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = () => {
    // Later you can filter using profileId
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  }, [profileId])

  if (!user) return <Loading />

  return (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* Cover Photo */}
          <div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* User Info */}
          <UserProfileinfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
            {['posts', 'media', 'likes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="mt-4 space-y-4">
              {posts?.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post._id || post.id} post={post} />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-6">
                  No posts yet
                </p>
              )}
            </div>
          )}

          {/* Media Tab (placeholder) */}
          {activeTab === 'media' && (
            <div className="flex flex-wrap mt-6 max-w-6xl">
              {
                 posts.filter((post)=>post.image_urls.length>0).map((post)=>(
                  <>
                  {
                    post.image_urls.map((image,index)=>(
                      <Link target='_blank' to={image} key={index} className='relative group'>
                        <img src={image} key={index} className="w-64 aspect-video object-cover" alt="image" />
                        <p className="absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300">
                          Posted {moment(post.createdAt).fromNow()}
                        </p>
                      </Link>
                    ))
                  }
                  </>
                 ))
              }
            </div>
          )}

          {/* Likes Tab (placeholder) */}
          {activeTab === 'likes' && (
            <p className="text-center text-gray-500 mt-6">
              No liked posts
            </p>
          )}
        </div>

      </div>
      {/* Edit Profile Modal */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit}/>}
    </div>
  )
}

export default Profile
