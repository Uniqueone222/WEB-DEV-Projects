import { createContext, useState, useEffect } from 'react'

export const StudyContext = createContext()

export function StudyProvider({ children }) {

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('subjects')
    return saved ? JSON.parse(saved) : []
  })

  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem('topics')
    return saved ? JSON.parse(saved) : []
  })

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [revisionSchedule, setRevisionSchedule] = useState(() => {
    const saved = localStorage.getItem('revisionSchedule')
    return saved ? JSON.parse(saved) : []
  })

  // Sync each state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects))
  }, [subjects])

  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics))
  }, [topics])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('revisionSchedule', JSON.stringify(revisionSchedule))
  }, [revisionSchedule])

  const value = {
    subjects,
    setSubjects,
    topics,
    setTopics,
    tasks,
    setTasks,
    revisionSchedule,
    setRevisionSchedule
  }

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  )
}