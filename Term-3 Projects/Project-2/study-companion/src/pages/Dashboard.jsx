import { useContext } from 'react'
import { StudyContext } from '../context/StudyContext'
import useProgress from '../hooks/useProgress'
import ProgressChart from '../components/ProgressChart'
import RevisionList from '../components/RevisionList'

function Dashboard() {
    const { topics, revisionSchedule } = useContext(StudyContext)
    const { totalTasks, completed, pending, revision, overdue, completionPercent, subjectProgress } = useProgress()

    // get upcoming revisions (sorted by date)
    const upcomingRevisions = [...revisionSchedule]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5)

    return (
        <div className="page dashboard-page">
            <h2>📊 Dashboard</h2>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{totalTasks}</h3>
                    <p>Total Tasks</p>
                </div>
                <div className="stat-card completed">
                    <h3>{completed}</h3>
                    <p>Completed</p>
                </div>
                <div className="stat-card pending">
                    <h3>{pending}</h3>
                    <p>Pending</p>
                </div>
                <div className="stat-card revision">
                    <h3>{revision}</h3>
                    <p>Revision</p>
                </div>
                <div className="stat-card overdue">
                    <h3>{overdue}</h3>
                    <p>Overdue</p>
                </div>
            </div>

            {/* Charts */}
            <ProgressChart
                completionPercent={completionPercent}
                completed={completed}
                pending={pending}
                subjectProgress={subjectProgress}
            />

            {/* Upcoming Revisions */}
            <div className="section">
                <h3>📅 Upcoming Revisions</h3>
                <RevisionList revisions={upcomingRevisions} topics={topics} />
            </div>
        </div>
    )
}

export default Dashboard
