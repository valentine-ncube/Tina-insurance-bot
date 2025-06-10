import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

let chatSession = null

const prompt = `
You are Tina, an experienced insurance consultant. Your task is to recommend the best insurance policy to users based on their vehicle type and age.
    - Policies: 
      1. Mechanical Breakdown Insurance (MBI): Not available for trucks and racing cars.
      2. Comprehensive Car Insurance: Available only for vehicles less than 10 years old.
      3. Third Party Car Insurance: Available for all vehicles.
    - Start by asking for vehicle type and vehicle age step-by-step.
    - Analyze user responses and dynamically adjust your questions and suggestions.
    - Keep the tone professional, conversational, and friendly.
    - After gathering enough information, recommend one or more policies with reasons.
  `

// Initialize the generative AI
async function initializeGenerativeAI(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY)
  const model = await genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstructions: prompt,
  })
  return model
}

// Start a Tina session
export const startTinaSession = async (req, res) => {
  const { resetSession } = req.body

  try {
    if (!chatSession || resetSession) {
      const model = await initializeGenerativeAI(prompt)
      chatSession = model.startChat({ history: [] })
    }
    const initialResponse =
      'Hello! I`m Tina, your insurance assistant. May I ask you a few questions to recommend the best insurance policy for you?'
    res.join({ aiResponse: initialResponse })
  } catch (error) {
    console.error('Error in initializing chat session:', error.message)
    res.status(500).json({ error: 'Failed to initialize chat session' })
  }
}
