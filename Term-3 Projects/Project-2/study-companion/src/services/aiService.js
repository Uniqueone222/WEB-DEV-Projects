// Hugging Face Inference API (OpenAI-compatible router, no CORS issues)
// Get your free token at: huggingface.co -> Settings -> Access Tokens
// Create a Fine-grained token with "Make calls to Inference Providers" permission
// Add to your .env file as: VITE_HF_API_KEY=hf_xxxxxxxxxxxxxxxx

const API_KEY = import.meta.env.VITE_HF_API_KEY || ''
const API_URL = 'https://router.huggingface.co/v1/chat/completions'

// Llama 3.1 8B is a confirmed chat model available on the free tier
const MODEL = 'meta-llama/Llama-3.1-8B-Instruct'

async function callHuggingFace(prompt) {
  if (!API_KEY) {
    throw new Error('API Key missing. Please add VITE_HF_API_KEY to your .env file.')
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful study assistant for a college student.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || `Request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// generate a summary for a topic
export async function generateSummary(topic) {
  const prompt = `Give a clear and concise summary of the topic: "${topic}". Keep it simple and easy to understand for a college student.`
  return await callHuggingFace(prompt)
}

// generate practice questions for a topic
export async function generateQuestions(topic) {
  const prompt = `Generate 5 practice questions on the topic: "${topic}". Include a mix of short answer and multiple choice questions. Keep them suitable for a college student.`
  return await callHuggingFace(prompt)
}

// generate flashcards for a topic
export async function generateFlashcards(topic) {
  const prompt = `Create 5 flashcards for the topic: "${topic}". Format each as "Q: [question]" and "A: [answer]". Keep them short and useful for quick revision.`
  return await callHuggingFace(prompt)
}