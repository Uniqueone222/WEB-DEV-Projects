import { useState, useContext } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { toast } from 'react-toastify'
import { StudyContext } from '../context/StudyContext'
import RevisionList from '../components/RevisionList'
import { generateId, formatDate } from '../utils/helpers'
import useSubjects from '../hooks/useSubjects'
import useTasks from '../hooks/useTasks'
import { FaSync } from 'react-icons/fa'
function Revision() {
    const { topics, subjects, revisionSchedule, setRevisionSchedule, tasks, setTasks } = useContext(StudyContext)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedTopic, setSelectedTopic] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')
    const [title, setTitle] = useState('');
    const { getTopicsBySubject} = useSubjects()
    const filteredTopics = selectedSubject ? getTopicsBySubject(selectedSubject) : []
    const {addTask} = useTasks();

    // add a revision entry
    function addRevision() {
        if  (!selectedSubject) {
            toast.error('Please select a subject')
            return
        }

        if (!selectedTopic) {
            toast.error('Please select a topic')
            return
        }

        const newRevision = {
            id: generateId(),
            topic: selectedTopic,
            date: selectedDate.toLocaleDateString()
        }

        const newTaskData = {
            title: title,
            topic: selectedTopic,
            subject: selectedSubject,
            deadline: selectedDate.toLocaleDateString(),
            priority: selectedPriority,
            status: "Revision"
        }
        addTask(newTaskData)
        setRevisionSchedule([...revisionSchedule, newRevision])
        setSelectedTopic('')
        toast.success('Revision scheduled!')
    }

    // delete a revision
    function deleteRevision(id) {
        const revision = revisionSchedule.find(r => r.id === id)
        setRevisionSchedule(revisionSchedule.filter(r => r.id !== id))

        if (revision?.taskId) {
            setTasks(tasks.map(t => t.id === revision.taskId ? { ...t, status: 'Completed' }: t))
        }
        toast.info('Revision Completed')
    }

    // highlight dates that have revisions on the calendar
    function tileClassName({ date }) {
        const dateStr = date.toLocaleDateString().split('T')[0]
        const hasRevision = revisionSchedule.some(r => r.date === dateStr)
        return hasRevision ? 'revision-date' : null
    }

    // sort revisions by date
    const sortedRevisions = [...revisionSchedule].sort((a, b) => new Date(a.date) - new Date(b.date))
    
    return (
        <div className="page revision-page">
            <h2><FaSync/> Revision Planner</h2>

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
                        
                        {/*Input for Task Title */}
                        <input
                            value={title}
                            onChange={(e) =>{
                                setTitle(e.target.value);
                            }}
                            placeholder='Enter a Title'
                        />

                        {/*Drop down for Subjects */}
                        <select
                            value={selectedSubject}
                            onChange={(e) => {
                                setSelectedSubject(e.target.value);
                                setSelectedTopic('');
                            }}>

                            <option value="">Select Subject</option>
                            {subjects.map(s => (
                                <option key={s.id}  value={s.id} >{s.name}</option>
                            ))}

                        </select>

                        {/*Drop down for Topics */}
                        <select 
                        value={selectedTopic} 
                        onChange={(e) => setSelectedTopic(e.target.value)} 
                        disabled={!selectedSubject}>

                            <option value="">Select Topic</option>
                            {filteredTopics.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}

                        </select>
                        
                        {/*Drop Down for Priority*/}
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                        </select>

                        <button className="btn-primary" onClick={addRevision}>Schedule</button>

                    </div>
                </div>

                {/* Revision List */}
                <div className="revision-list-section">
                    <h3>All Scheduled Revisions</h3>
                    {sortedRevisions.length > 0 ? (
                        <RevisionList
                            revisions={sortedRevisions}
                            topics={topics}
                            onDelete={deleteRevision}
                        />
                    ) : (
                        <p className="no-data">No revisions scheduled yet</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Revision
