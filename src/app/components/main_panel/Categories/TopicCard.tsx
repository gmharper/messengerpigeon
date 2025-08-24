"use client"

// IMPORTS
import { useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state"

// SCRIPTS
import { patchUserData } from "@/app/scripts/patch/index"
import { patchTopicData } from "@/app/scripts/patch/index"
import { deleteTopic } from "@/app/scripts/delete/index"

// COMPONENTS
import { Tooltip } from "react-tooltip"
import { BoxLabel, RowCard, ReadButton, StarButton } from "../../style"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type topic = {
    type:string, slug:string, name:string, description:string,
    topic_colour:string, img_url:string,
    subscribers:Array<string>, articles:Array<number>, comments:Array<number>,
    created_at:string
}

type AppProps = {
    slug: string,
    topic: topic,
    cardShape: string
}

function TopicCard ({ slug, topic, cardShape }:AppProps ):React.JSX.Element {
    const { loggedInUsername } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)

    const topicReducer = (state:any, action:any) => {
        const topicCopy = {...state}

        for (const key in action) {
            if (topicCopy.hasOwnProperty(key)) topicCopy[key] = action[key]
        } return topicCopy
    }

    const [storedTopic, setStoredTopic] = useReducer(topicReducer, topic)

    const [isSubscribed, setIsSubscribed] = useState(false)
    
    function openTopicPage () {
        const topicState = {
            id: slug,
            loading_page: true,
            display_type: "topic_page",
            sorts: 'article_sorts',
            sort: 'created_at',
            order: 'DESC',
            page: 0,
            per_page: 12,
            roost_type: 'topic',
            topic: slug,
            heading: `${topic? topic.name? topic.name : 'TOPIC' : 'TOPIC'}`
        }
        setCurrentState(topicState)
    }
    
    function handleSubscribe () {
        setIsSubscribed(true) // optimistic rendering

        const subscriptions:Array<string> = [...storedTopic.subscribers]
        subscriptions.push(loggedInUsername)

        setStoredTopic({ subscribers: subscriptions })
        
        // make call to db
        // if returns error unset the value
    }
    
    function handleUnsubscribe () {
        setIsSubscribed(false) // optimistic rendering

        const subscriptions:Array<string> = [...storedTopic.subscribers]
        subscriptions.splice(subscriptions.indexOf(loggedInUsername))

        setStoredTopic({ subscribers: subscriptions })
        
        // make call to db
        // if returns error unset the value
    }
    
    useEffect(() => {
        if (topic) return setStoredTopic(topic)
    }, [topic])

    return (
        <>
            { topic ? cardShape==='row' ?
                <RowCard type={'topic'} height={'h-32 '} styling={isSubscribed ? "outline-3 outline-sky-500 shadow-lg shadow-sky-500 " : ""} children={
                    <div className='relative w-full'>
                        <img src={topic ? topic.img_url ? topic.img_url 
                            : "https://kcc.org.nz/wp-content/uploads/2016/08/Kereru-Craig-McKenzie-e1470708765247.jpg" 
                            : "https://kcc.org.nz/wp-content/uploads/2016/08/Kereru-Craig-McKenzie-e1470708765247.jpg" } className='absolute w-full'
                        />

                        <div className='flex flex-col w-full h-full p-2'>
                            <div className='z-20 flex flex-row'>
                                <BoxLabel text={topic.name} text_size='text-sm '/>

                                <div className='flex-1' />

                                <div className='z-20 flex flex-row gap-1'>
                                    <div 
                                        className='flex w-12 bg-zinc-200 rounded-sm place-content-center items-center'
                                        data-tooltip-id={slug +'_subscribers'}
                                        data-tooltip-content='Number of Subscribers'
                                        data-tooltip-place='bottom'
                                    >
                                        <p className='text-black'>{storedTopic? storedTopic.subscribers? storedTopic.subscribers.length : 0 : 0}</p>
                                    </div>

                                    <StarButton isStarred={isSubscribed} setFn={ handleSubscribe } unsetFn={ handleUnsubscribe } />
                                </div>
                                <Tooltip id={slug +'_subscribers'}/>
                            </div>
                            
                            <div className='flex-1'/>

                            <div className='z-20 flex flex-row'>
                                <div className='flex-1' />

                                <ReadButton text={''} Fn={openTopicPage} />
                            </div>
                        </div>
                    </div> 
                } />
                : <></> 
                : <></>
            }
        </>
    )
}

export default TopicCard