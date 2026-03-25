import { format, isPast, isToday } from 'date-fns'

// generate a simple unique id
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// format a date string to readable format like "Mar 25, 2026"
export function formatDate(dateString) {
    if (!dateString) return ''
    return format(new Date(dateString), 'MMM dd, yyyy')
}

// check if a deadline has passed
export function isOverdue(deadline) {
    if (!deadline) return false
    const date = new Date(deadline)
    return isPast(date) && !isToday(date)
}
