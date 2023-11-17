import React, { useState } from 'react'
import { sendEmail } from '../pages/api/services'

const ShareScreen = ({ shareableURL }) => {
    const [email, setEmail] = useState('')
    const [sucessMessage, setSucessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSendEmail = async (email, shareableURL) => {
        console.log('email, shareableURL', email, shareableURL)
        try {
            // const questionsData = await sendEmail(email, shareableURL)
            await sendEmail(email, shareableURL)
            setSucessMessage('Email Sent!')
        } catch (error) {
            setErrorMessage('Error sending email, please try again later')
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

                {sucessMessage && (
                    <p className="text-green-600 mt-2">{sucessMessage}</p>
                )}

                {errorMessage && (
                    <p className="bg-red-500 text-white p-2 rounded-md mt-2">{errorMessage}</p>
                )}
            </div>
        </>
    )
}

export default ShareScreen
