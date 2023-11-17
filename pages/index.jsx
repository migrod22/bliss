import { ListQuestions } from '../components/ListQuestions'
import { useState, useEffect } from 'react'
import HealthPage from '../components/HealthPage'
import LoadingPage from '../components/LoadingPage'
import { useRouter } from 'next/router'

export default function Home() {
  const [healthOk, setHealthOk] = useState(false)
  const [loadingHealth, setLoadingHealth] = useState(true)
  const [errorHealth, setErrorHealth] = useState(null)

  const router = useRouter();


  const retryHealth = () => {
    router.push("/")
  }


  return (
    <>
      <HealthPage
        healthOk={healthOk}
        setHealthOk={setHealthOk}
        setLoadingHealth={setLoadingHealth}
        setErrorHealth={setErrorHealth}
      />
      {loadingHealth && <LoadingPage />}
      {!healthOk && <button className="bg-gray-500 text-white p-2 mr-2" onClick={retryHealth}>Retry Health</button>}
      {healthOk && <ListQuestions />}
    </>
  )
}
