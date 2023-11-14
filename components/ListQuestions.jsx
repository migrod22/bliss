import React, { useEffect, useState } from 'react'
import { fetchHealth, fetchQuestions } from '../pages/api/services';

export const ListQuestions = () => {

    const [health, setHealth] = useState(null)
    const [loadingHealth, setLoadingHealth] = useState(true);
    const [loadingQuestions, setLoadingQuestions] = useState(true);

    const [errorHealth, setErrorHealth] = useState(null);
    const [errorQuestions, setErrorQuestions] = useState(null);

    const [questions, setQuestions] = useState([])

    const checkHealth = async () => {
        try {
            setLoadingHealth(true);
            const healthData = await fetchHealth();
            setHealth(healthData);
            setLoadingHealth(false);
        } catch (error) {
            setErrorHealth(error);
            console.error("Error fetching health status:", error);
            setLoadingHealth(false);
        }
    };

    const getQuestions = async () => {
        try {
            setLoadingQuestions(true);
            const questionsData = await fetchQuestions();
            setQuestions(questionsData);
            setLoadingQuestions(false);
        } catch (error) {
            setErrorQuestions(error);
            console.error("Error fetching questions:", error);
            setLoadingQuestions(false);
        }
    };




    useEffect(() => {
        checkHealth();
    }, [health?.status]);

    useEffect(() => {
        getQuestions();
    }, []);

    console.log('questions', questions)

    console.log('health?.status', health?.status)

    return (
        <>

            <a className='text-yellow-700 bg-yellow-500'>List Questions</a>

            <a>{health?.status == "OK" && <p>Health is OKKKKKK</p>}</a>


            <ul>
                {questions.map((question) =>
                    <li>{question.question}</li>
                )}



                {/* {submissionList?.map((image) => (
                    <SubmissionPicture
                        image={image}
                        setSelectedImage={setSelectedImage}
                    />
                ))} */}
            </ul>

        </>
    )
}
