import { useEffect } from 'react'
import { fetchHealth } from '../pages/api/services';

const HealthPage = ({ healthOk, setHealthOk, setLoadingHealth, setErrorHealth }) => {

    const checkHealth = async () => {
        try {
            setLoadingHealth(true);
            const healthData = await fetchHealth();
            console.log('healthData HEALTH PAGE', healthData)
            if (healthData.status == "OK") {
                setHealthOk(true)
            } else {
                setHealthOk(false)
            }
            setLoadingHealth(false);
        } catch (error) {
            setErrorHealth(error);
            console.error("Error fetching health status:", error);
            setLoadingHealth(false);
        }
    };

    useEffect(() => {
        checkHealth();
    }, []);


    // return (
    //     <div>HealthPage</div>
    // )
}

export default HealthPage