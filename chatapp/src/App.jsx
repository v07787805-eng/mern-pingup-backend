import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Feed from './pages/Feed'
import Message from './pages/Message'
import ChatBox from './components/ChatBox'
import Profile from './pages/Profile'
import Connection from './pages/Connection'
import Discover from './pages/Discover'
import CreatePost from './pages/CreatePost'
import Layout from './pages/Layout'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { user } = useUser()

  return (
    <>
      {/* ✅ GLOBAL TOASTER */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />

      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Layout />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Message />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connection />} />
          <Route path="discover" element={<Discover />} />
         <Route path="profile/:userId" element={<Profile />} />
         <Route path="profile" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
