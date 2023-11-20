import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchQuestion, updateQuestionService } from '../api/services'
import ShareScreen from '../../components/ShareScreen'
import VotePage from '../../components/VotePage'

const ID = () => {
  const router = useRouter()
  const { id } = router.query

  const [isSharing, setIsSharing] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [shareableURL, setShareableURL] = useState('')
  const [question, setQuestion] = useState(null)

  const [votedChoice, setVotedChoice] = useState()

  const getQuestion = async () => {
    try {
      const detailedQuestion = await fetchQuestion(id)

      setQuestion(detailedQuestion)
    } catch (error) {
      console.error('Error fetching question details:', error)
    }
  }

  // Share feature
  const handleShare = () => {
    setIsSharing(!isSharing)
    const shareableURL = `${window.location.origin
      }/questions/${id}`
    setShareableURL(shareableURL)
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const toggleVoteModal = (choice) => {
    setVotedChoice(choice);
    setOpenModal(!openModal);
  };

  return (
    <>
      <>
        <div className="flex flex-col items-center justify-center">
          <a className="text-blue-500 text-3xl hover:underline mb-2">{question?.question}</a>
          <p className="mb-4">List of choices</p>
          {question?.choices.map((choice) => (
            <div key={choice.choice} className="mb-2">
              <button
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-52 h-12"
                onClick={() => toggleVoteModal(choice)}
              >
                {choice.choice} - {choice.votes} Votes
              </button>
            </div>
          ))}

          <div className="flex">
            <button
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 w-32"
              onClick={() => handleShare()}
            >
              Share
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700 w-32 ml-2"
              onClick={() => router.push("/")}
            >
              Go back
            </button>
          </div>
        </div>
        {openModal &&
          <VotePage
            choice={votedChoice}
            onClose={() => setOpenModal(false)}
            confirmVote={() => updateQuestionService(question, votedChoice, +id)}
          />}
        {isSharing && <ShareScreen shareableURL={shareableURL} />}
      </>

    </>


  )
}
export default ID
