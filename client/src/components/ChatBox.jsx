import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './ChatBox.module.css'

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [sessionInitialized, setSessionInitialized] = useState(false)

  const initializeSession = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/ask-tina', {
        resetSession: true,
      })
      const initialMessage = { sender: 'Tina', text: response.data.aiResponse }
      setMessages([initialMessage])
      setSessionInitialized(true)
    } catch (error) {
      console.error('Error initializing session:', error.message)
      alert('Failed to start AI session. Please try again.')
    }
  }
}
export default ChatBox
