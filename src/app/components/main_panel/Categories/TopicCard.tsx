
"use client"

// IMPORTS
import { useEffect, useState } from "react"

// TYPE DECLARATIONS
type topic = {
    type: string,
    slug: string,
    name: string,
    description: string,
    img_url: string
} | null

type AppProps = {
    topic: topic,
    cardShape: string
}

function TopicCard ({ topic, cardShape }:AppProps ):React.JSX.Element {
    const [storedTopic, setStoredTopic] = useState({})

    useEffect(() => {
        if (topic) setStoredTopic(topic)
    }, [topic])

    return (
        <>
            { topic ? cardShape==='row' ?
                <div className='w-full h-32'>
                    <p>
                        {topic.name}
                    </p>
                </div>
                : cardShape==='square' ?
                <div 
                    className='flex w-64 h-64 bg-radial from-white to-white/0 rounded-xl hover:outline-1 outline-white hover:shadow-lg shadow-white'
                    onClick={() => {}}
                >
                    <img src={topic.img_url ? topic.img_url : undefined} />
                </div>
                : <></> 
                : <></>
            }
        </>
    )
}

export default TopicCard