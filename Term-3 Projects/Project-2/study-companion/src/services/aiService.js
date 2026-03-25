// replace with your own xAI (Grok) API key
const API_KEY = import.meta.env.VITE_GROK_API_KEY || ''
const API_URL = 'https://api.x.ai/v1/chat/completions'

async function callGrok(prompt) {
    if (!API_KEY) throw new Error('API Key missing. Please add VITE_GROK_API_KEY to your .env file.')

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'You are a helpful study assistant for a college student.' },
                    { role: 'user', content: prompt }
                ],
                model: 'grok-2-latest', // grok-3 is not fully available on standard API endpoints yet, but we will use the latest model. You can change this to 'grok-3' if it works!
                temperature: 0.7
            })
        })

        if (!response.ok) {
            throw new Error(`Failed to generate response: ${response.status}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error('Grok API Error:', error)
        throw error
    }
}

// generate a summary for a topic
export async function generateSummary(topic) {
    const prompt = `Give a clear and concise summary of the topic: "${topic}". Keep it simple and easy to understand for a student.`
    return await callGrok(prompt)
}

// generate practice questions for a topic
export async function generateQuestions(topic) {
    const prompt = `Generate 5 practice questions on the topic: "${topic}". Include a mix of short answer and multiple choice questions. Keep them suitable for a college student.`
    return await callGrok(prompt)
}

// generate flashcards for a topic
export async function generateFlashcards(topic) {
    const prompt = `Create 5 flashcards for the topic: "${topic}". Format each as "Q: [question]" and "A: [answer]". Keep them short and useful for quick revision.`
    return await callGrok(prompt)
}
