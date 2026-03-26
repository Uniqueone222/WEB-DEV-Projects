import { useContext } from 'react'
import { StudyContext } from '../context/StudyContext'
import { isOverdue } from '../utils/helpers'

function useProgress() {
    const { tasks, subjects, topics } = useContext(StudyContext)

    const totalTasks = tasks.length
    const completed = tasks.filter(t => t.status === 'Completed').length
    const pending = tasks.filter(t => t.status === 'Pending').length
    const revision = tasks.filter(t => t.status === 'Revision').length
    const overdue = tasks.filter(t => t.status !== 'Completed' && isOverdue(t.deadline)).length

    // completion percentage
    const completionPercent = totalTasks > 0
        ? Math.round((completed / totalTasks) * 100)
        : 0

    // progress per subject for the bar chart
    const subjectProgress = subjects.map(sub => {
        const subjectTasks = tasks.filter(t => t.subject === sub.id)
        const subjectCompleted = subjectTasks.filter(t => t.status === 'Completed').length
        return {
            name: sub.name,
            total: subjectTasks.length,
            completed: subjectCompleted,
            color: sub.color
        }
    })

    return {
        totalTasks,
        completed,
        pending,
        revision,
        overdue,
        completionPercent,
        subjectProgress
    }
}

export default useProgress
