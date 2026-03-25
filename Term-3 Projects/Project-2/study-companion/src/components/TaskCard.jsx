import { FaTrash, FaCheck } from 'react-icons/fa'
import { formatDate, isOverdue } from '../utils/helpers'

function TaskCard({ task, onToggle, onDelete }) {
    const overdue = isOverdue(task.deadline) && task.status !== 'Completed'

    return (
        <div className={`task-card ${overdue ? 'overdue' : ''} ${task.status === 'Completed' ? 'completed' : ''}`}>
            <div className="task-card-top">
                <h4 className="task-title">{task.title}</h4>
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </div>

            <div className="task-details">
                <span>📘 {task.subject}</span>
                {task.topic && <span>📝 {task.topic}</span>}
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
                <button className="btn-icon btn-delete" onClick={() => onDelete(task.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default TaskCard
