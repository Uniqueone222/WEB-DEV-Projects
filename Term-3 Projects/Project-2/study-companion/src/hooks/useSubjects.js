import { useContext } from 'react'
import { StudyContext } from '../context/StudyContext'
import { generateId } from '../utils/helpers'

function useSubjects() {
    const { subjects, setSubjects, topics, setTopics } = useContext(StudyContext)

    // add a new subject
    function addSubject(subjectData) {
        const newSubject = {
            id: generateId(),
            name: subjectData.name,
            description: subjectData.description || '',
            color: subjectData.color || '#4a90d9'
        }
        setSubjects([...subjects, newSubject])
    }

    // delete a subject and its topics
    function deleteSubject(id) {
        const subject = subjects.find(s => s.id === id)
        setSubjects(subjects.filter(s => s.id !== id))
        if (subject) {
            setTopics(topics.filter(t => t.subjectId !== id))
        }
    }

    // add a topic under a subject
    function addTopic(topicData) {
        const newTopic = {
            id: generateId(),
            subjectId: topicData.subjectId,
            name: topicData.name,
            difficulty: topicData.difficulty || 'Medium',
            status: 'Not Started',
            notes: topicData.notes || ''
        }
        setTopics([...topics, newTopic])
    }

    // update topic status
    function updateTopicStatus(id, newStatus) {
        setTopics(topics.map(topic => {
            if (topic.id === id) {
                return { ...topic, status: newStatus }
            }
            return topic
        }))
    }

    // delete a topic
    function deleteTopic(id) {
        setTopics(topics.filter(topic => topic.id !== id))
    }

    // get topics for a specific subject
    function getTopicsBySubject(subjectId) {
        return topics.filter(t => t.subjectId === subjectId)
    }

    return {
        subjects,
        topics,
        addSubject,
        deleteSubject,
        addTopic,
        updateTopicStatus,
        deleteTopic,
        getTopicsBySubject
    }
}

export default useSubjects