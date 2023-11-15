import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../pages/api/services';


export const ListQuestions = () => {
    const dispatch = useDispatch();
    const { loading: loadingQuestions, questions } = useSelector(
        (state) => state.questions
    );



    const getQuestions = async () => {
        try {
            dispatch({
                type: 'SET_QUESTIONS',
                payload: [],
            });
            const questionsData = await fetchQuestions();
            dispatch({
                type: 'SET_QUESTIONS',
                payload: questionsData,
            });
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };


    useEffect(() => {
        getQuestions();
    }, [dispatch]);


    return (
        <>
            <a className="text-yellow-700 bg-yellow-500">List Questions</a>

            {loadingQuestions ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {questions.map((question, id) => (
                        <li key={id}>{question.question}</li>
                    ))}
                </ul>
            )}
        </>
    );
};
