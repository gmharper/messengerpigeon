import { useEffect, useState } from "react";

// TYPE DECLARATIONS
type AppProps = {
    topic: topic
}

type topic = {
    type: string,
    slug: string,
    name: string,
    description: string,
    img_url: string
} | null

function TopicPage ({ topic }:AppProps ):React.JSX.Element {
    const [storedTopic, setStoredTopic] = useState({ type: 'topic', slug: '', name: '', description: '', img_url: ''})

    return (
        <>
        { topic ? 
            <div>
                <p>{ topic ? topic.slug : '' }</p>
            </div>
            : <></>
        }
        </>
    )
}

export default TopicPage