import { useContext } from 'react'
import { StudyContext } from '../context/StudyContext'
import { generateId } from '../utils/helpers'

function useTasks() {
    const { tasks, setTasks, revisionSchedule, setRevisionSchedule } = useContext(StudyContext)

    // add a new task
    function addTask(taskData) {
        const newTask = {
            id: generateId(),
            title: taskData.title,
            subject: taskData.subject,
            topic: taskData.topic,
            deadline: taskData.deadline,
            priority: taskData.priority || 'Medium',
            status: taskData.status === 'Revision' ? 'Revision' : 'Pending'
        }
        setTasks([...tasks, newTask])
    }

    // update an existing task
    function updateTask(id, updatedFields) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, ...updatedFields }
            }
            return task
        }))
    }

    // mark a task as revision
    function markRevision(id) {
        const task = tasks.find(t => t.id === id)
    
        if (!task) {
            return { error: 'Task not found' }
        }

        if (task.status !== 'Completed') {
            return { error: 'Complete the task before adding to revision' }
        }
        
        const newRevision = {
            id: generateId(),
            topic: task.topic,
            taskId: task.id,
            date: task.deadline
        }

        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: 'Revision' } : t
        ))

        setRevisionSchedule([...revisionSchedule,newRevision])
    }
    

    // delete a task by id
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    // toggle task between Pending and Completed
    function toggleComplete(id) {
      const task = tasks.find((t) => t.id === id);

      const updatedTasks = tasks.map(t =>
        t.id === id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t);

        setTasks(updatedTasks);

        if (task?.status === "Revision") {
            setRevisionSchedule(revisionSchedule.filter((r) => r.taskId !== task.id),);
        }
    }

    return { tasks, addTask, updateTask, deleteTask, toggleComplete, markRevision }
}

export default useTasks
