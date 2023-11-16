import { ListQuestions } from '../components/ListQuestions'
import { useState, useEffect } from 'react'
import HealthPage from '../components/HealthPage'

export default function Home() {
  const [healthOk, setHealthOk] = useState(false)
  const [loadingHealth, setLoadingHealth] = useState(true)
  const [errorHealth, setErrorHealth] = useState(null)

  useEffect(() => {
    // console.log('healthOk INDEX', healthOk)
  }, [healthOk])

  return (
    <>
      <HealthPage
        healthOk={healthOk}
        setHealthOk={setHealthOk}
        setLoadingHealth={setLoadingHealth}
        setErrorHealth={setErrorHealth}
      />
      {loadingHealth && <p className='bg-red-600'>Loading Health</p>}
      {!healthOk && <button>Retry Health</button>}
      {healthOk && <ListQuestions />}
    </>
  )
}
