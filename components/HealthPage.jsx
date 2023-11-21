import { useEffect } from 'react'
import { fetchHealth } from '../pages/api/services'

const HealthPage = ({
  healthOk,
  setHealthOk,
  loadingHealth,
  setLoadingHealth,
  setErrorHealth,
}) => {
  const checkHealth = async () => {
    try {
      setLoadingHealth(true)
      const healthData = await fetchHealth()
      if (healthData.status == 'OK') {
        setHealthOk(true)
      } else {
        setHealthOk(false)
      }
      setLoadingHealth(false)
    } catch (error) {
      setErrorHealth(true)
      console.error('Error fetching health status:', error)
      setLoadingHealth(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <>
      <a className='flex items-center justify-center'>
        {!healthOk && !loadingHealth &&
          <button className="bg-red-500 text-white p-2 mr-2" onClick={() => checkHealth()}>Retry Health</button>
        }
      </a>
    </>
  )
}

export default HealthPage
