import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { fetchQuestion } from '../api/services';

const ID = () => {
    const router = useRouter();
    const { id } = router.query;
    const [question, setQuestion] = useState(null)


    const getQuestion = async () => {
        try {
            const detailedQuestion = await fetchQuestion(id);

            console.log('detailedQuestion', detailedQuestion)
            setQuestion(detailedQuestion)
        } catch (error) {
            console.error('Error fetching question details:', error);
        }
    };

    useEffect(() => {
        getQuestion()
    }, [])

    return (
        <>
            <a>Question {question?.question}</a>
            <div>Detail Page for question with {id}</div>
        </>
    )
}
export default ID;