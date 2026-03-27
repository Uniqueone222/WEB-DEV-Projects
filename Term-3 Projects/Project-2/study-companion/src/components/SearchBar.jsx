import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import useDebounce from '../hooks/useDebounce'

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 400)

    // send debounced value to parent whenever it changes
    useEffect(() => {
        onSearch(debouncedQuery)
    }, [debouncedQuery, onSearch])

    return (
        <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
                type="text"
                placeholder="Search tasks, topics, notes..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
        </div>
    )
}

export default SearchBar
