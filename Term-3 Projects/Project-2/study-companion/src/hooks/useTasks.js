import { useContext } from 'react'
import { StudyContext } from '../context/StudyContext'
import { generateId } from '../utils/helpers'

function useTasks() {
    const { tasks, setTasks } = useContext(StudyContext)

    // add a new task
    function addTask(taskData) {
        const newTask = {
            id: generateId(),
            title: taskData.title,
            subject: taskData.subject,
            topic: taskData.topic,
            deadline: taskData.deadline,
            priority: taskData.priority || 'Medium',
            status: 'Pending'
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

    // delete a task by id
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    // toggle task between Pending and Completed
    function toggleComplete(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    status: task.status === 'Completed' ? 'Pending' : 'Completed'
                }
            }
            return task
        }))
    }

    return { tasks, addTask, updateTask, deleteTask, toggleComplete }
}

export default useTasks
