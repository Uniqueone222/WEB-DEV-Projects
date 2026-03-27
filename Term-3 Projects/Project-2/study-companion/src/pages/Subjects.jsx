import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import useSubjects from '../hooks/useSubjects'
import SubjectCard from '../components/SubjectCard'
import { FaBook } from 'react-icons/fa'

// form validation
const subjectSchema = yup.object({
    name: yup.string().required('Subject name is required'),
    description: yup.string(),
    color: yup.string()
})

const topicSchema = yup.object({
    name: yup.string().required('Topic name is required'),
    difficulty: yup.string()
})

function Subjects() {
    const { subjects, topics, addSubject, deleteSubject, addTopic, updateTopicStatus, deleteTopic, getTopicsBySubject } = useSubjects()

    const [selectedSubject, setSelectedSubject] = useState(null)
    const [showSubjectForm, setShowSubjectForm] = useState(false)
    const [showTopicForm, setShowTopicForm] = useState(false)

    // subject form
    const { register: regSubject, handleSubmit: handleSubjectSubmit, reset: resetSubject, formState: { errors: subjectErrors } } = useForm({
        resolver: yupResolver(subjectSchema)
    })

    // topic form
    const { register: regTopic, handleSubmit: handleTopicSubmit, reset: resetTopic, formState: { errors: topicErrors } } = useForm({
        resolver: yupResolver(topicSchema)
    })

    function onAddSubject(data) {
        addSubject(data)
        resetSubject()
        setShowSubjectForm(false)
        toast.success('Subject added!')
    }

    function onDeleteSubject(id) {
        deleteSubject(id)
        if (selectedSubject && selectedSubject.id === id) {
            setSelectedSubject(null)
        }
        toast.info('Subject deleted')
    }

    function onAddTopic(data) {
        addTopic({ ...data, subjectId: selectedSubject.id })
        resetTopic()
        setShowTopicForm(false)
        toast.success('Topic added!')
    }

    // topics for the selected subject
    const subjectTopics = selectedSubject ? getTopicsBySubject(selectedSubject.id) : []

    return (
        <div className="page subjects-page">
            <div className="page-header">
                <h2><FaBook/> Subjects</h2>
                <button className="btn-primary" onClick={() => setShowSubjectForm(!showSubjectForm)}>
                    {showSubjectForm ? 'Cancel' : '+ Add Subject'}
                </button>
            </div>

            {/* Add Subject Form */}
            {showSubjectForm && (
                <form className="form-card" onSubmit={handleSubjectSubmit(onAddSubject)}>
                    <input type="text" placeholder="Subject Name" {...regSubject('name')} />
                    {subjectErrors.name && <span className="error">{subjectErrors.name.message}</span>}
                    <input type="text" placeholder="Description" {...regSubject('description')} />
                    <label>Color Label</label>
                    <input type="color" defaultValue="#4a90d9" {...regSubject('color')} />
                    <button type="submit" className="btn-primary">Add Subject</button>
                </form>
            )}

            {/* Subject Cards Grid */}
            <div className="card-grid">
                {subjects.map(sub => (
                    <SubjectCard
                        key={sub.id}
                        subject={sub}
                        topicCount={topics.filter(t => t.subjectId === sub.id).length}
                        onDelete={onDeleteSubject}
                        onSelect={setSelectedSubject}
                    />
                ))}
                {subjects.length === 0 && <p className="no-data">No subjects yet. Add one above!</p>}
            </div>

            {/* Topics Panel */}
            {selectedSubject && (
                <div className="topics-panel">
                    <div className="page-header">
                        <h3>Topics in {selectedSubject.name}</h3>
                        <button className="btn-primary" onClick={() => setShowTopicForm(!showTopicForm)}>
                            {showTopicForm ? 'Cancel' : '+ Add Topic'}
                        </button>
                    </div>

                    {showTopicForm && (
                        <form className="form-card" onSubmit={handleTopicSubmit(onAddTopic)}>
                            <input type="text" placeholder="Topic Name" {...regTopic('name')} />
                            {topicErrors.name && <span className="error">{topicErrors.name.message}</span>}
                            <select {...regTopic('difficulty')}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            <button type="submit" className="btn-primary">Add Topic</button>
                        </form>
                    )}

                    <div className="topics-list">
                        {subjectTopics.map(topic => (
                            <div key={topic.id} className="topic-item">
                                <div className="topic-info">
                                    <strong>{topic.name}</strong>
                                    <span className="difficulty-badge">{topic.difficulty}</span>
                                </div>
                                <div className="topic-actions">
                                    <select
                                        value={topic.status}
                                        onChange={(e) => updateTopicStatus(topic.id, e.target.value)}
                                    >
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Needs Revision">Needs Revision</option>
                                    </select>
                                    <button className="btn-icon btn-delete" onClick={() => deleteTopic(topic.id)}>🗑️</button>
                                </div>
                            </div>
                        ))}
                        {subjectTopics.length === 0 && <p className="no-data">No topics yet</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Subjects
