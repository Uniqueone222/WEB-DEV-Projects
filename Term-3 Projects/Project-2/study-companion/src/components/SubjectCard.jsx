import { FaTrash } from 'react-icons/fa'

function SubjectCard({ subject, topicCount, onDelete, onSelect }) {
    return (
        <div
            className="subject-card"
            style={{ borderLeft: `4px solid ${subject.color}` }}
            onClick={() => onSelect(subject)}
        >
            <div className="subject-card-header">
                <h3>{subject.name}</h3>
                <button
                    className="btn-icon"
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(subject.id)
                    }}
                >
                    <FaTrash />
                </button>
            </div>
            <p className="subject-desc">{subject.description}</p>
            <span className="topic-count">{topicCount} topics</span>
        </div>
    )
}

export default SubjectCard
