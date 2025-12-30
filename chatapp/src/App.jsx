import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

import Login from './pages/Login.jsx'
import Feed from './pages/Feed'
import Message from './pages/Message'
import ChatBox from './components/ChatBox'
import Profile from './pages/Profile'
import Connection from './pages/Connection'
import Discover from './pages/Discover'
import CreatePost from './pages/CreatePost'
import Layout from './pages/Layout'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return null // or <Loading />

  return (
    <>
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
        {/* Public route */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Feed />} />
          <Route path="messages" element={<Message />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connection />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
