import { formatDate } from '../utils/helpers'

function RevisionList({ revisions, topics, onDelete }) {

    // match revision to its topic name
    function getTopicName(topicId) {
        const topic = topics.find(t => t.id === topicId)
        return topic ? topic.name : 'Unknown Topic'
    }

    if (revisions.length === 0) {
        return <p className="no-data">No revisions scheduled</p>
    }

    return (
        <div className="revision-list">
            {revisions.map(rev => (
                <div key={rev.id} className="revision-item">
                    <span className="revision-topic">{getTopicName(rev.topicId)}</span>
                    <span className="revision-date">📅 {formatDate(rev.date)}</span>
                    <button className="btn-icon btn-delete" onClick={() => onDelete(rev.id)}>🗑️</button>
                </div>
            ))}
        </div>
    )
}

export default RevisionList
