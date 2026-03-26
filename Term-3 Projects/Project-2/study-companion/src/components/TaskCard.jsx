import { FaTrash, FaCheck, FaClock } from 'react-icons/fa'
import { formatDate, isOverdue } from '../utils/helpers'
import { useContext } from 'react'
import { StudyContext } from '../context/StudyContext'

function TaskCard({ task, onToggle, onDelete, onMarkRevision }) {
    const overdue = isOverdue(task.deadline) && task.status !== 'Completed'
    const { subjects, topics } = useContext(StudyContext)

    const subjectName = subjects.find(s => s.id === task.subject)?.name || 'Unknown'
    const topicName =  topics.find(t => t.id === task.topic)?.name || ''

    return (
        <div className={`task-card ${overdue ? 'overdue' : ''} ${task.status === 'Completed' ? 'completed' : ''}`}>
            <div className="task-card-top">
                <h4 className="task-title">{task.title}</h4>
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </div>

            <div className="task-details">
                <span>📘 {subjectName}</span>
                {task.topic && <span>📝 {topicName}</span>}
                <span>📅 {formatDate(task.deadline)}</span>
            </div>

            <div className="task-status">
                <span className={`status-label status-${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                </span>
                {overdue && <span className="overdue-label">Overdue!</span>}
            </div>

            <div className="task-actions">
                <button className="btn-icon btn-complete" onClick={() => onToggle(task.id)}>
                    <FaCheck />
                </button>
                <button className="btn-icon btn-revision" onClick={() => onMarkRevision(task.id)} title="Mark for revision">
                    <FaClock />
                </button>
                <button className="btn-icon btn-delete" onClick={() => onDelete(task.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default TaskCard
