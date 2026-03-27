import { useState } from 'react'
import { toast } from 'react-toastify'
import { generateSummary, generateQuestions, generateFlashcards } from '../services/aiService'
import { 
FaRobot, FaFileAlt, FaQuestionCircle, FaLayerGroup} from "react-icons/fa";

function AITools() {
    const [topic, setTopic] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleGenerate(type) {
        if (!topic.trim()) {
            toast.error('Please enter a topic')
            return
        }

        setLoading(true)
        setResult('')

        try {
            let response = ''
            if (type === 'summary') {
                response = await generateSummary(topic)
            } else if (type === 'questions') {
                response = await generateQuestions(topic)
            } else if (type === 'flashcards') {
                response = await generateFlashcards(topic)
            }
            setResult(response)
        } catch (error) {
            console.error('AI Error:', error)
            toast.error('Failed to generate. Check your API key.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page ai-page">
            <h2><FaRobot className="mr-2" /> AI Study Assistant</h2>

            <div className="ai-input-section">
                <input
                    type="text"
                    placeholder="Enter a topic (e.g. Binary Search Trees)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="ai-input"
                />

                <div className="ai-buttons">
                    <button className="btn-primary" onClick={() => handleGenerate('summary')} disabled={loading}>
                        <FaFileAlt className="mr-2" /> Summary
                    </button>
                    <button className="btn-primary" onClick={() => handleGenerate('questions')} disabled={loading}>
                        <FaQuestionCircle className="mr-2" /> Questions
                    </button>
                    <button className="btn-primary" onClick={() => handleGenerate('flashcards')} disabled={loading}>
                        <FaLayerGroup className="mr-2" /> Flashcards
                    </button>
                </div>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Generating...</p>
                </div>
            )}

            {/* AI Result */}
            {result && (
                <div className="ai-result">
                    <h3>Result</h3>
                    <pre className="ai-output">{result}</pre>
                </div>
            )}
        </div>
    )
}

export default AITools
