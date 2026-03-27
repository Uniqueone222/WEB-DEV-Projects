import { formatDate } from '../utils/helpers'
import {FaCalendar} from 'react-icons/fa'
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
                    <span className="revision-topic">{getTopicName(rev.topic)}</span>
                    <span className="revision-date"><FaCalendar/> {formatDate(rev.date)}</span>
                    <button className="btn-icon btn-delete" onClick={() => onDelete(rev.id)}>🗑️</button>
                </div>
            ))}
        </div>
    )
}

export default RevisionList
