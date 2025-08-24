// IMPORTS
import { useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { getTopics } from "../../../scripts/fetch/index"

// COMPONENTS
import { ListBox, LoadingCard } from "../../style/index"
import { TopicCard } from "./index"
import { GridPanel } from "../Main/index"
import { SyncLoader } from "react-spinners"


// TYPE DECLARATIONS
type topic = {
    type:string, slug: string, description: string,
    topic_colour:string, img_url: string,
    subscribers: Array<string>,
    created_at: string
}

function TopicsPanel ():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    const [topics, setTopics] = useState([])
    const [filteredTopics, setFilteredTopics] = useState([])

    const [topicsLoading, setTopicsLoading] = useState(false)
    const [topicsError, setTopicsError] = useState(null)


    // UTILITY FUNCTIONS
    async function filterTopics (topicsToFilter:any) {
        const topicsFiltered = topicsToFilter.filter((topic:any) => {
            if ((topic.slug && topic.slug.includes(params.search)) || (topic.body && topic.body.includes(params.search))) return topic //user
        })
        setFilteredTopics(topicsFiltered)

        return topicsFiltered
    }

    function setHeading (filtered:any) {
        let headingString = "TOPICS"
        setParams({ location: 'topics_panel', heading: `TOPICS (${params.page*params.per_page}/${filtered.length})` })
    }


    // USE EFFECTS
    useEffect(() => {
        getTopics(setTopics, setTopicsLoading, setTopicsError, params.sort, params.order, params.page, params.per_page)
        .then((topics:any) => {
            return filterTopics(topics)
        })
        .then((filtered:any) => {
            setHeading(filtered)
        })
        .finally(() => {
            setParams({ loading_page: false })
        })
    }, [params.sort, params.order, params.page, params.per_page])

    useEffect(() => {
        filterTopics(topics)
        .then((filtered:any) => {
            setHeading(filtered)
        })
    }, [params.search])


    return (
        <div className='p-8'>
        { 
            topicsError ? 
            <LoadingCard type={'error'} display_type="Topics" err_msg={topicsError? topicsError : ""} styling='my-16' />
            : 
            topicsLoading ? 
            <LoadingCard type={'loading'} display_type="Topics" styling='my-16' />
            :
            (topics.length===0 || filteredTopics.length===0)?
            <LoadingCard type={'empty'} message='Looks like there are no topics to show...' styling='my-16' />
            :
            <GridPanel 
                cardShape={params.card_shape || 'row'}
                isLoading={topicsLoading}
                error={topicsError}
                children={
                    filteredTopics.map((topic:any):React.JSX.Element => {
                        return (
                            <TopicCard slug={topic.slug ? topic.slug : 'coding'} topic={topic} cardShape={params.card_shape || 'row'} />
                        )
                    })
                }
            />
        }
        </div>
    )
}

export default TopicsPanel