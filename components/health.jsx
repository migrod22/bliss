import React, { useState, useEffect } from 'react'
import { fetchHealth } from '../pages/api/services';

const Health = () => {

    const [health, setHealth] = useState(null)

    const checkHealth = async () => {
        try {
            const healthData = await fetchHealth();
            setHealth(healthData);
        } catch (error) {
            console.error("Error fetching health status:", error);
        }
    };


    useEffect(() => {
        checkHealth();
    }, [health?.data]);


    return (
        <>
            {health?.status == "OK" && <p>OKKKKKK</p>}
        </>
    )
};

export default Health;