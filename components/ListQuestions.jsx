import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions } from '../pages/api/services'
import { useRouter } from 'next/router'
import ShareScreen from './ShareScreen'

export const ListQuestions = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading: loadingQuestions, questions } = useSelector(
        (state) => state.questions
    )

    const [searchInput, setSearchInput] = useState('')
    const [counterQuestions, setCounterQuestions] = useState(1)

    const [isSharing, setIsSharing] = useState(false)
    const [shareableURL, setShareableURL] = useState('')

    const getQuestions = async (limit, offset) => {
        try {
            const questionsData = await fetchQuestions(
                limit || 10,
                offset || 0,
                searchInput
            )
            dispatch({
                type: 'SET_QUESTIONS',
                payload: questionsData,
            })
        } catch (error) {
            console.error('Error fetching questions:', error)
        }
    }

    // Search input related code
    const handleInputChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getQuestions(10, 0)
        }
    }

    // Load Questions function
    const loadMoreQuestions = () => {
        setCounterQuestions(counterQuestions + 1)
        getQuestions(10, counterQuestions * 10)
    }

    // Redirect to question detail page
    const handleSelectQuestion = async (questionId) => {
        router.push(`/questions/${questionId}`)
    }

    // Reset search
    const handleDismiss = () => {
        setSearchInput()
        // getQuestions();
    }

    // Get the first 10 questions when page first loads
    useEffect(() => {
        getQuestions()
    }, [])

    // Share feature
    const handleShare = () => {
        setIsSharing(!isSharing)
        const shareableURL = `${window.location.origin
            }/questions/?filter=${encodeURIComponent(searchInput)}`
        setShareableURL(shareableURL)
    }

    return (
        <>
            <p className='bg-red-600'>TEST TAILWIND</p>
            <input
                type='text'
                value={searchInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder='Search question'
            />
            <button className='bg-red-500' onClick={() => getQuestions()}>Search</button>
            <button onClick={() => handleDismiss()}>Dismiss</button>
            <button onClick={() => handleShare()}>Share</button>
            {loadingQuestions ? (
                <p>Loading questions...</p>
            ) : (
                <ul>
                    {questions.map((question, id) => (
                        <li key={id} onClick={() => handleSelectQuestion(question.id)}>
                            {question.question}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => loadMoreQuestions()}>Load More</button>
            {isSharing && <ShareScreen shareableURL={shareableURL} />}
        </>
    )
}
