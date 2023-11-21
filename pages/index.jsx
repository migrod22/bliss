import { ListQuestions } from '../components/ListQuestions'
import { useEffect, useState } from 'react'
import HealthPage from '../components/HealthPage'
import LoadingPage from '../components/LoadingPage'

export default function Home() {
  const [healthOk, setHealthOk] = useState(false)
  const [loadingHealth, setLoadingHealth] = useState(true)
  const [errorHealth, setErrorHealth] = useState(false)
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [])



  return (
    <>
      {isOnline && <>
        {errorHealth && <p className='flex items-center justify-center text-red-500'>Upsss, something went wrong!</p>}
        <HealthPage
          healthOk={healthOk}
          setHealthOk={setHealthOk}
          loadingHealth={loadingHealth}
          setLoadingHealth={setLoadingHealth}
          setErrorHealth={setErrorHealth}
        />
        {loadingHealth && <LoadingPage />}
        {healthOk && <ListQuestions />}
      </>}

      {!isOnline && <>
        <p className='flex items-center justify-center text-red-500'>We're not online at the moment, please try again later...</p>
      </>}

    </>
  )
}
