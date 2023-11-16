import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions } from '../pages/api/services'
import { useRouter } from 'next/router'

export const ListQuestions = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading: loadingQuestions, questions } = useSelector(
    (state) => state.questions
  )

  const [searchInput, setSearchInput] = useState('')
  const [counterQuestions, setCounterQuestions] = useState(1)

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

  // Get first 10 questions when page loads
  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <>
      <div>
        <input
          type='text'
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder='Search question'
        />
        <button onClick={() => getQuestions()}>Search</button>
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
      </div>
    </>
  )
}
