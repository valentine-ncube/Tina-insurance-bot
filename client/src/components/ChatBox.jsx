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
  //Handles user messages and sends them to the backend
  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    // Adds user message to the chat
    const userMessage = { sender: 'user', text: userInput }
    setMessages((prev) => [...prev, userMessage])

    try {
      //POST request to the backend with user input
      const response = await axios.post(
        'http://localhost:5000/api/tina-response',
        {
          userResponse: userInput,
        }
      )

      // Adds AI response to the chat
      const aiMessage = { sender: 'Tina', text: response.data.aiResponse }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error communicating with Tina:', error)
      const errorMessage = {
        sender: 'Tina',
        text: 'Sorry, something went wrong. Please try again.',
      }
      setMessages((prev) => [...prev, errorMessage])
    }
    // Clears user input field
    setUserInput('')
  }

  useEffect(() => {
    if (!sessionInitialized) {
      initializeSession()
    }
  }, [sessionInitialized])
}

export default ChatBox
