import React from 'react'
import ChatBox from './components/ChatBox'
import styles from './App.module.css'

function App() {
  return (
    <div>
      <h2>Tina- Your Insurance Policy Assistant</h2>
      <ChatBox />
      <footer className={styles.footer}>
        🤖 Powered by <strong>Google Gemini</strong> | Created by Valentine | ©{' '}
        {new Date().getFullYear()}
      </footer>
    </div>
  )
}
export default App
