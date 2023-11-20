import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

const VotePage = ({ choice, onClose, confirmVote }) => {
    const modalRef = useRef(null)

    const confirmAndClose = () => {
        toast.success("Hey, just got your vote!")
        confirmVote()
        onClose()
    }

    const handleClickOutsideModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideModal)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal)
        }
    }, [])

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                <div ref={modalRef} className="bg-white w-full max-w-md p-6 rounded-md shadow-md">
                    <div className="flex items-center justify-end">
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            Close X
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => confirmAndClose()}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 "
                        >
                            Confirm Vote
                        </button>

                    </div>
                    <div className="mt-4">
                        <p className="text-lg font-semibold flex items-center justify-center">
                            {choice.choice} - {choice.votes} Votes
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VotePage