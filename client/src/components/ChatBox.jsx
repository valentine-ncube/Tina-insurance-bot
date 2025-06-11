import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './ChatBox.module.css'

const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [sessionInitialized, setSessionInitialized] = useState(false)
}
export default ChatBox
