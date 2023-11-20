import React, { useState } from 'react'
import { sendEmail } from '../pages/api/services'
import toast from 'react-hot-toast'

const ShareScreen = ({ shareableURL }) => {
    const [email, setEmail] = useState('')

    const handleSendEmail = async (email, shareableURL) => {
        try {
            await sendEmail(email, shareableURL)
            toast.sucess("Email Sent!")
        } catch (error) {
            toast.error("Error sending email, please try again later...")
            console.error('Error sending email:', error)
        }
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    return (
        <>
            <div className='mt-5 flex items-center justify-center'>
                <input
                    type="text"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Enter destination email"
                    className="border border-gray-300 p-2 rounded-md"
                />

                <button
                    onClick={() => handleSendEmail(email, shareableURL)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Send Email
                </button>
            </div>
        </>
    )
}

export default ShareScreen
