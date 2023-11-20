import { ListQuestions } from '../components/ListQuestions'
import { useState } from 'react'
import HealthPage from '../components/HealthPage'
import LoadingPage from '../components/LoadingPage'


export default function Home() {
  const [healthOk, setHealthOk] = useState(false)
  const [loadingHealth, setLoadingHealth] = useState(true)
  const [errorHealth, setErrorHealth] = useState(false)

  return (
    <>
      {errorHealth && <p className='flex items-center justify-center text-red-500'>Upsss, something went wrong!</p>}

      <HealthPage
        healthOk={healthOk}
        setHealthOk={setHealthOk}
        setLoadingHealth={setLoadingHealth}
        setErrorHealth={setErrorHealth}
      />
      {loadingHealth && <LoadingPage />}
      {healthOk && <ListQuestions />}
    </>
  )
}
