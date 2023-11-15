import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './api/services';

const Questions = () => {
    const router = useRouter();
    const { filter } = router.query;

    const dispatch = useDispatch();
    const { loading: loadingQuestions, questions } = useSelector((state) => state.questions);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (filter) {
            setSearchInput(filter);
        } else {
            setSearchInput('');
        }
    }, [filter]);

    const getQuestions = async () => {
        try {
            dispatch({
                type: 'SET_QUESTIONS',
                payload: [],
            });
            setSearchInput(searchInput);
            const questionsData = await fetchQuestions(10, 10, searchInput);
            dispatch({
                type: 'SET_QUESTIONS',
                payload: questionsData,
            });
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        console.log('searchInput inside handlekeypress', searchInput)
        if (event.key === 'Enter') {
            getQuestions();
        }
    };

    useEffect(() => {
        getQuestions();
    }, [searchInput])


    return (
        <div>
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                autoFocus={filter !== ''}
            />
            <button onClick={getQuestions}>Search</button>
            {loadingQuestions ? (
                <p>Loading questions...</p>
            ) : (
                <ul>
                    {questions.map((question, id) => (
                        <li key={id}>{question.question}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Questions;
