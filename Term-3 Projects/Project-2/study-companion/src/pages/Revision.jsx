import { useState, useContext } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { toast } from 'react-toastify'
import { StudyContext } from '../context/StudyContext'
import RevisionList from '../components/RevisionList'
import { generateId, formatDate } from '../utils/helpers'

function Revision() {
    const { topics, revisionSchedule, setRevisionSchedule } = useContext(StudyContext)

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTopic, setSelectedTopic] = useState('')

    // add a revision entry
    function addRevision() {
        if (!selectedTopic) {
            toast.error('Please select a topic')
            return
        }

        const newRevision = {
            id: generateId(),
            topicId: selectedTopic,
            date: selectedDate.toISOString().split('T')[0]
        }

        setRevisionSchedule([...revisionSchedule, newRevision])
        setSelectedTopic('')
        toast.success('Revision scheduled!')
    }

    // delete a revision
    function deleteRevision(id) {
        setRevisionSchedule(revisionSchedule.filter(r => r.id !== id))
        toast.info('Revision removed')
    }

    // highlight dates that have revisions on the calendar
    function tileClassName({ date }) {
        const dateStr = date.toISOString().split('T')[0]
        const hasRevision = revisionSchedule.some(r => r.date === dateStr)
        return hasRevision ? 'revision-date' : null
    }

    // sort revisions by date
    const sortedRevisions = [...revisionSchedule].sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="page revision-page">
            <h2>🔄 Revision Planner</h2>

            <div className="revision-layout">
                {/* Calendar */}
                <div className="calendar-section">
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileClassName={tileClassName}
                    />

                    {/* Schedule Form */}
                    <div className="form-card revision-form">
                        <h4>Schedule Revision for {formatDate(selectedDate)}</h4>
                        <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                            <option value="">Select Topic</option>
                            {topics.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <button className="btn-primary" onClick={addRevision}>Schedule</button>
                    </div>
                </div>

                {/* Revision List */}
                <div className="revision-list-section">
                    <h3>All Scheduled Revisions</h3>
                    {sortedRevisions.length > 0 ? (
                        <div className="revision-list">
                            {sortedRevisions.map(rev => {
                                const topic = topics.find(t => t.id === rev.topicId)
                                return (
                                    <div key={rev.id} className="revision-item">
                                        <div>
                                            <span className="revision-topic">{topic ? topic.name : 'Unknown'}</span>
                                            <span className="revision-date">📅 {formatDate(rev.date)}</span>
                                        </div>
                                        <button className="btn-icon btn-delete" onClick={() => deleteRevision(rev.id)}>🗑️</button>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="no-data">No revisions scheduled yet</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Revision
