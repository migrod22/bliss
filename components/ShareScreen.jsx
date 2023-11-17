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
            <input
                type='text'
                value={email}
                onChange={handleChangeEmail}
                placeholder='Enter destination email'
            />
            <button onClick={() => handleSendEmail(email, shareableURL)}>
                Send Email
            </button>
            {sucessMessage && <a>{sucessMessage}</a>}
            {errorMessage && <a className='bg-red-500'>{errorMessage}</a>}
        </>
    )
}

export default ShareScreen
