import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://private-anon-14eb092cc3-blissrecruitmentapi.apiary-mock.com/',
})

export const fetchHealth = async () => {
  try {
    const response = await api.get('health')
    return response.data
  } catch (error) {
    console.error('Error getting health status:', error)
    throw error
  }
}

export const fetchQuestions = async (limit, offset, filter) => {
  try {
    const queryParams = new URLSearchParams({
      limit: limit || 10,
      offset: offset || 0,
      filter: filter || '',
    })

    const response = await api.get(`questions?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('Error getting questions:', error)
    throw error
  }
}

export const fetchQuestion = async (id) => {
  try {
    const response = await api.get(`questions/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting questions:', error)
    throw error
  }
}

export const sendEmail = async (email, content_url) => {
  try {
    const response = await api.get(
      `share?destination_email=${email}&content_url=${content_url}`
    )
    return response.data
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export const updateQuestionService = async (question, votedChoice, question_id) => {
  try {
    const payload = {
      ...question,
      choices: question.choices.map((choice) => {
        if (choice.choice === votedChoice.choice) {
          return { ...choice, votes: votedChoice.votes + 1 };
        }
        return { ...choice };
      }),
    };

    const response = await api.put(`/questions/${question_id}`, { payload });
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};