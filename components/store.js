import { configureStore } from '@reduxjs/toolkit';


const questionsReducer = (state = { questions: [], loading: true }, action) => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return { ...state, questions: action.payload, loading: false };

        default:
            return state;
    }
};

const store = configureStore({
    reducer: {
        questions: questionsReducer,
    },
});

export default store;
