import { GoogleGenerativeAI } from '@google/generative-ai'

// replace with your own Gemini API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

// generate a summary for a topic
export async function generateSummary(topic) {
    const prompt = `Give a clear and concise summary of the topic: "${topic}". Keep it simple and easy to understand for a student.`
    const result = await model.generateContent(prompt)
    return result.response.text()
}

// generate practice questions for a topic
export async function generateQuestions(topic) {
    const prompt = `Generate 5 practice questions on the topic: "${topic}". Include a mix of short answer and multiple choice questions. Keep them suitable for a college student.`
    const result = await model.generateContent(prompt)
    return result.response.text()
}

// generate flashcards for a topic
export async function generateFlashcards(topic) {
    const prompt = `Create 5 flashcards for the topic: "${topic}". Format each as "Q: [question]" and "A: [answer]". Keep them short and useful for quick revision.`
    const result = await model.generateContent(prompt)
    return result.response.text()
}
