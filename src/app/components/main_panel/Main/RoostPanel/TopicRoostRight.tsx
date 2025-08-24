// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AppContext } from "@/app/page"

// COMPONENTS
import { StarButton } from "@/app/components/style"

// TYPE DECLARATIONS
type topic = {
    type:string, slug:string, description:string, created_by:string,
    topic_colour:string, img_url:string,
    subscribers:Array<string>,
    created_at:string
}

type Props = {
    topic:topic,
    setTopic?:any,
    setTopicStyling?:any
}

function TopicRoostRight ({ topic, setTopic, setTopicStyling }:Props):React.JSX.Element {
    const { loggedInUsername, loggedInUser, setLoggedInUser } = useContext(AppContext)

    const [isSubscribed, setIsSubscribed] = useState(loggedInUser? loggedInUser.subscribed_topics.includes(topic.slug) : false)

    function handleSubscribe () {
        if (topic && setTopic) {
            setIsSubscribed(true) // optimistic rendering

            const topicSubscribers = [...topic.subscribers]
            topicSubscribers.push(loggedInUsername)
            
            setTopic({ subscribers: topicSubscribers })
            setTopicStyling({ outlineWidth: '2px' })
            // make call to db
            // if error set value to previous
        }

    }

    function handleUnsubscribe () {
        if (topic && setTopic) {
            setIsSubscribed(false) // optimistic rendering
    
            const topicSubscribers = [...topic.subscribers]
            topicSubscribers.splice(topicSubscribers.indexOf(loggedInUsername))
    
            setTopic({ subscribers: topicSubscribers })
            setTopicStyling({ outlineWidth: '0px' })
        }
        // make call to db
        // if error set value to previous
    }

    useEffect(() => {

    }, [topic])

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row gap-1'>
            <div className='flex flex-row rounded-sm overflow-hidden'>
                <div className='flex w-32 h-8 bg-zinc-300 items-center px-2'>
                    <p className='text-black'>{`${topic? topic.subscribers? topic.subscribers.length : 0 : 0} subscribers`}</p>
                </div>
            </div>

                <StarButton isStarred={isSubscribed} setFn={handleSubscribe} unsetFn={handleUnsubscribe} />
            </div>
        </div>
    )
}

export default TopicRoostRight