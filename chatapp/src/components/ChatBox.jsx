import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react'

const ChatBox = () => {
  const [messages, setMessages] = useState(dummyMessagesData)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user] = useState(dummyUserData)

  const messagesEndRef = useRef(null)

  const sendMessage = () => {
    if (!text && !image) return

    const imageUrl = image ? URL.createObjectURL(image) : null

    const newMessage = {
      _id: Date.now(),
      text,
      message_type: image ? 'image' : 'text',
      media_url: imageUrl,
      to_user_id: user._id, // current user (sent message)
      createdAt: new Date().toISOString(),
    }

    setMessages(prev => [...prev, newMessage])
    setText('')
    setImage(null)
  }

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      messages.forEach(msg => {
        if (msg.media_url?.startsWith('blob:')) {
          URL.revokeObjectURL(msg.media_url)
        }
      })
    }
  }, [messages])

  if (!user) return null

  return (
    <div className="flex flex-col h-screen bg-slate-50">

      {/* Header */}
      <div className="flex items-center gap-2 p-3 md:px-10 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <img
          src={user.profile_picture}
          alt="profile"
          className="w-9 h-9 rounded-full"
        />
        <div>
          <p className="font-medium">{user.full_name}</p>
          <p className="text-sm text-gray-500 -mt-1">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 md:px-10 overflow-y-scroll">
        <div className="space-y-4 max-w-4xl mx-auto">

          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map(msg => {
              const isMe = msg.to_user_id === user._id

              return (
                <div
                  key={msg._id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow
                      ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}
                    `}
                  >
                    {msg.message_type === 'image' && (
                      <img
                        src={msg.media_url}
                        alt="sent"
                        className="w-full max-w-sm rounded-lg mb-1"
                      />
                    )}
                    {msg.text && <p>{msg.text}</p>}
                  </div>
                </div>
              )
            })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 p-2 bg-white w-full max-w-xl mx-auto border shadow rounded-full">
          
          <input
            type="text"
            className="flex-1 outline-none text-slate-700"
            placeholder="Type a message..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />

          <label htmlFor="image" className="cursor-pointer">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="h-8 w-8 object-cover rounded"
              />
            ) : (
              <ImageIcon className="w-7 h-7 text-gray-400" />
            )}
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />
          </label>

          <button
            onClick={sendMessage}
            className="bg-gradient-to-br from-indigo-500 to-purple-600
              hover:from-indigo-700 hover:to-purple-800
              active:scale-95 text-white p-2 rounded-full"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
