
"use client"

// IMPORTS
import { useEffect, useState } from "react"
import { getTopics } from "../../../scripts/fetch"

// COMPONENTS
import { ListBox } from "../../style/index"
import { TopicCard } from "./index"

// TYPE DECLARATIONS
type AppProps = {
    cardShape: string,
    sort?: string,
    order?: string,
    page?: number,
    filters?: any
}

type topic = {
    type: string,
    slug: string,
    name: string,
    description: string,
    img_url: string
} | null

function TopicsPanel ({ cardShape='square', sort, order, page, filters }:AppProps ):React.JSX.Element {
    const [topics, setTopics] = useState([])
    const [topicsLoading, setTopicsLoading] = useState(false)
    const [topicsError, setTopicsError] = useState(null)

    useEffect(() => {
        getTopics(setTopics, setTopicsLoading, setTopicsError, sort, order, page, 20)
    },[])

    return (
        <div>
            { topicsLoading ? <p>Loading...</p> :
                cardShape==='row' ?
                <div className='flex flex-col'>
                    {topics.map((topic:topic, index) => { 
                        return <ListBox child={<TopicCard cardShape={cardShape} topic={topic} />} index={index} />
                    }) }
                </div> :
                <div className='grid grid-cols-4 gap-8'>
                    {topics.map((topic:topic, index) => { 
                        return <TopicCard cardShape={cardShape} topic={topic} />
                    }) }
                </div>
            }
        </div>
    )
}

export default TopicsPanel