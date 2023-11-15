import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, fetchQuestions } from '../pages/api/services';
import { Detail } from './Detail';
import { useRouter } from 'next/router';


export const ListQuestions = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading: loadingQuestions, questions } = useSelector(
        (state) => state.questions
    );

    const [searchInput, setSearchInput] = useState('');



    const getQuestions = async () => {
        try {
            dispatch({
                type: 'SET_QUESTIONS',
                payload: [],
            });
            const questionsData = await fetchQuestions(10, 10, searchInput);
            dispatch({
                type: 'SET_QUESTIONS',
                payload: questionsData,
            });
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };


    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getQuestions();
        }
    };

    // useEffect(() => {
    //     getQuestions();
    // }, [searchInput])


    useEffect(() => {
        getQuestions();
    }, []);


    // const handleScroll = () => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop ===
    //         document.documentElement.offsetHeight
    //     ) {
    //         // User has scrolled to the bottom, load more questions
    //         getQuestions();
    //     }
    // };

    // useEffect(() => {
    //     // Initial data fetch
    //     getQuestions();

    //     // Event listener for scrolling
    //     window.addEventListener('scroll', handleScroll);

    //     // Cleanup the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);




    const handleSelectQuestion = async (questionId) => {
        router.push(`/questions/${questionId}`);
    };





    return (
        <>
            <div>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Search..."
                />
                <button onClick={getQuestions}>Search</button>
                {loadingQuestions ? (
                    <p>Loading questions...</p>
                ) : (
                    <ul>
                        {questions.map((question, id) => (
                            <li onClick={() => handleSelectQuestion(question.id)} key={id}>{question.question}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};
