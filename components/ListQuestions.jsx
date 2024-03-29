import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../pages/api/services';
import { useRouter } from 'next/router';
import ShareScreen from './ShareScreen';

export const ListQuestions = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { filter } = router.query
    const inputRef = useRef(null);

    const { loading: loadingQuestions, questions } = useSelector(
        (state) => state.questions
    );

    const [searchInput, setSearchInput] = useState(filter ? filter : null);
    const [counterQuestions, setCounterQuestions] = useState(1);
    const [isSharing, setIsSharing] = useState(false);
    const [shareableURL, setShareableURL] = useState('');

    const getQuestions = async (limit, offset, search) => {
        try {
            const questionsData = await fetchQuestions(
                limit || 10,
                offset || 0,
                search ? search : searchInput
            );
            dispatch({
                type: 'SET_QUESTIONS',
                payload: questionsData,
            });
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };



    useEffect(() => {
        if (inputRef.current && filter) {
            inputRef.current.value = filter;
        }
    }, [filter]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getQuestions(10, 0);
        }
    };

    // Load Questions function
    const loadMoreQuestions = () => {
        setCounterQuestions(counterQuestions + 1);
        getQuestions(10, counterQuestions * 10, filter ? filter : inputRef.current.value);
    };

    // Redirect to question detail page
    const handleSelectQuestion = async (questionId) => {
        router.push(`/question/${questionId}`);
    };

    // Reset search
    const handleDismiss = () => {
        setSearchInput('');
        getQuestions()
    };

    useEffect(() => {
        if (!searchInput) {
            getQuestions()
        }
    }, [searchInput])

    // Get the first 10 questions when the page first loads
    useEffect(() => {
        getQuestions();
    }, []);

    // Share feature
    const handleShare = () => {
        setIsSharing(!isSharing);
        const shareableURL = `${window.location.origin}/questions/?filter=${encodeURIComponent(
            searchInput
        )}`;
        setShareableURL(shareableURL);
    };

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                ref={inputRef}
                onKeyDown={handleKeyPress}
                placeholder="Search question"
                className="border border-gray-300 p-2 mb-4"
            />
            <button className="bg-blue-500 text-white p-2 mr-2"
                onClick={() => getQuestions(10, 0, inputRef.current.value)}
            >
                Search
            </button>
            <button className="bg-gray-500 text-white p-2 mr-2" onClick={handleDismiss}>
                Dismiss
            </button>
            <button className="bg-green-500 text-white p-2" onClick={handleShare}>
                Share
            </button>
            <div className='flex flex-col items-center justify-center'>
                {loadingQuestions ? (
                    <p>Loading questions...</p>
                ) : (
                    <ul className="list-disc pl-4">
                        {questions.map((question, id) => (
                            <li
                                key={id}
                                onClick={() => handleSelectQuestion(question.id)}
                                className="cursor-pointer text-blue-500 hover:underline mb-2"
                            >
                                {question.question}
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    className="bg-purple-500 text-white p-2 mt-4"
                    onClick={() => loadMoreQuestions()}
                >
                    Load More
                </button>
            </div>

            {isSharing && <ShareScreen shareableURL={shareableURL} />}
        </div>
    );
};
