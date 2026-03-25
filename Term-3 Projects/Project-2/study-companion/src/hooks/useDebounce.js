import { useState, useEffect } from 'react'

// delays updating the value until user stops typing
function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // cleanup the timer if value changes before delay
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

export default useDebounce
