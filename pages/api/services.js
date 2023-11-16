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
    console.log('typeof(limit)', typeof limit)
    console.log('typeof(offset)', typeof offset)
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
    console.log('response.data fetchQuestion', response.data)
    return response.data
  } catch (error) {
    console.error('Error getting questions:', error)
    throw error
  }
}

// export const createBook = async (newBook: any) => {
//     try {
//         const response = await api.post("livro/", newBook);
//         return response.data;
//     } catch (error) {
//         console.error("Error creating book:", error);
//         throw error;
//     }
// };
