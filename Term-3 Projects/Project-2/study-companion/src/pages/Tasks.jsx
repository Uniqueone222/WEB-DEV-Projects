import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { StudyContext } from '../context/StudyContext'
import useTasks from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'
import SearchBar from '../components/SearchBar'
import { isOverdue } from '../utils/helpers'

// form validation
const taskSchema = yup.object({
    title: yup.string().required('Task title is required'),
    subject: yup.string().required('Subject is required'),
    topic: yup.string(),
    deadline: yup.string().required('Deadline is required'),
    priority: yup.string(),
    status: yup.string()
})

function Tasks() {
    const { subjects, topics } = useContext(StudyContext)
    const { tasks, addTask, deleteTask, toggleComplete, markRevision } = useTasks()

    const [activeTab, setActiveTab] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [filterSubject, setFilterSubject] = useState('')
    const [filterPriority, setFilterPriority] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [sortBy, setSortBy] = useState('deadline')
    const [showForm, setShowForm] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema)
    })

    function onAddTask(data) {
        addTask(data)
        reset()
        setShowForm(false)
        toast.success('Task added!')
    }

    function onDelete(id) {
        deleteTask(id)
        toast.info('Task deleted')
    }

    function onToggle(id) {
        toggleComplete(id)
        toast.success('Task updated!')
    }

    function onMarkRevision(id) {
        const result = markRevision(id)

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success('Marked for revision!')
        }
    }

    // filter by tab
    let filteredTasks = [...tasks]
    if (activeTab === 'Pending') {
        filteredTasks = filteredTasks.filter(t => t.status === 'Pending')
    } else if (activeTab === 'Completed') {
        filteredTasks = filteredTasks.filter(t => t.status === 'Completed')
    } else if (activeTab === 'Overdue') {
        filteredTasks = filteredTasks.filter(t => t.status !== 'Completed' && isOverdue(t.deadline))
    } else if (activeTab === 'Revision') {
        filteredTasks = filteredTasks.filter(t => t.status === 'Revision')
    }

    // search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter((t) => {
        const subjectName =
          subjects.find((s) => s.id === t.subject)?.name || "";
        const topicName = topics.find((tp) => tp.id === t.topic)?.name || "";

        return (
          t.title.toLowerCase().includes(q) ||
          subjectName.toLowerCase().includes(q) ||
          topicName.toLowerCase().includes(q)
        );
      });
    }

    // subject filter
    if (filterSubject) {
        filteredTasks = filteredTasks.filter(t => t.subject === filterSubject)
    }

    // priority filter
    if (filterPriority) {
        filteredTasks = filteredTasks.filter(t => t.priority === filterPriority)
    }

    // sorting
    filteredTasks.sort((a, b) => {
        if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline)
        if (sortBy === 'priority') {
            const order = { High: 1, Medium: 2, Low: 3 }
            return order[a.priority] - order[b.priority]
        }
        if (sortBy === 'subject') {
            const subjectA = subjects.find(s => s.id === a.subject)
            const subjectB = subjects.find(s => s.id === b.subject)

            const nameA = subjectA ? subjectA.name : ''
            const nameB = subjectB ? subjectB.name : ''

            return nameA.localeCompare(nameB)
        }
        return 0
    })

    const tabs = ['All', 'Pending', 'Completed', 'Overdue', 'Revision']
    const filteredTopics = selectedSubject ? topics.filter(t => t.subjectId === selectedSubject): []

    return (
        <div className="page tasks-page">
            <div className="page-header">
                <h2>✅ Tasks</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Task'}
                </button>
            </div>

            {/* Add Task Form */}
            {showForm && (
                <form className="form-card" onSubmit={handleSubmit(onAddTask)}>
                    <input type="text" placeholder="Task Title" {...register('title')} />
                    {errors.title && <span className="error">{errors.title.message}</span>}

                    {/*Drop Down for Subjects */}
                    <select {...register('subject')} onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.subject && <span className="error">{errors.subject.message}</span>}
                    
                    {/*Drop down for Topics */}
                    <select {...register('topic')} disabled={!selectedSubject}>
                        <option value="">Select Topic</option>
                        {filteredTopics.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>

                    <input type="date" {...register('deadline')} />
                    {errors.deadline && <span className="error">{errors.deadline.message}</span>}

                    <select {...register('priority')}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <button type="submit" className="btn-primary">Add Task</button>
                </form>
            )}

            {/* Tabs */}
            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="filters-row">
                <SearchBar onSearch={setSearchQuery} />

                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                    <option value="">All Subjects</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>

                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="deadline">Sort by Due Date</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="subject">Sort by Subject</option>
                </select>
            </div>

            {/* Task List */}
            <div className="card-grid">
                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onMarkRevision={onMarkRevision}
                    />
                ))}
                {filteredTasks.length === 0 && <p className="no-data">No tasks found</p>}
            </div>
        </div>
    )
}

export default Tasks
