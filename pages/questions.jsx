import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchQuestions } from './api/services';

const Questions = () => {
    const router = useRouter();
    const { filter } = router.query;

    console.log('filter', filter)

    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [questions, setQuestions] = useState([])

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
            setLoadingQuestions(true);
            // const questionsData = await fetchQuestions();
            const questionsData = await fetchQuestions(10, 10, filter);
            setQuestions(questionsData);
            setLoadingQuestions(false);
        } catch (error) {
            // setErrorQuestions(error);
            console.error("Error fetching questions:", error);
            setLoadingQuestions(false);
        }
    };

    // const handleSearch = () => {
    //    
    //     router.push({
    //         pathname: '/questions',
    //         query: { filter: searchInput },
    //     });
    // };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getQuestions();
        }
    };

    console.log('questions', questions)

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
            {questions}
        </div>
    );
};

export default Questions;
