import React, { useEffect, useState } from 'react'
import { fetchHealth, fetchQuestions } from '../pages/api/services';

export const ListQuestions = () => {

    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [questions, setQuestions] = useState([])


    const getQuestions = async () => {
        try {
            setLoadingQuestions(true);
            const questionsData = await fetchQuestions();
            setQuestions(questionsData);
            setLoadingQuestions(false);
        } catch (error) {
            // setErrorQuestions(error);
            console.error("Error fetching questions:", error);
            setLoadingQuestions(false);
        }
    };


    useEffect(() => {
        getQuestions();
    }, []);

    console.log('questions', questions)


    return (
        <>

            <a className='text-yellow-700 bg-yellow-500'>List Questions</a>

            <ul>
                {questions.map((question, id) =>
                    <li key={id}>{question.question}</li>
                )}
            </ul>

        </>
    )
}
