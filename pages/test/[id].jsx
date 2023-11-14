import React from 'react'
import { useRouter } from 'next/router'

export default function Id() {

    const router = useRouter()
    const { id } = router.query
    console.log('id', id)
    return (
        <div>OLA ID {id}</div>
    )
}
