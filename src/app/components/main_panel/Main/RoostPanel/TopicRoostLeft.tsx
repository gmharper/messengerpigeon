import { useEffect } from "react"

// COMPONENTS
import { BoxLabel } from "@/app/components/style"

// TYPE DECLARATIONS
type topic = {
    type:string, slug:string, name:string, description:string, created_by:string,
    topic_colour:string, img_url:string,
    subscribers:Array<string>,
    created_at:string
}

type Props = {
    topic:topic
}

function TopicRoostLeft ({ topic }:Props):React.JSX.Element {
    return (
        <div className='flex flex-col gap-1'>
            <BoxLabel text={topic? topic.name : 'Topic'} styling={' w-100 outline-1 outline-zinc-300'} children={
                <>
                    <div className=' ml-2 bg-zinc-200 px-2 rounded-sm'>
                        <p className='text-black'>{`@${topic? topic.slug : "topic_slug"}`}</p>
                    </div>
                </>
            }/>
            <textarea 
                className='flex-1 bg-zinc-800/90 text-white text-xs p-1 rounded-sm p-1'
                value={topic? topic.description : ''}
                contentEditable={'false'}
            />
        </div>
    )
}

export default TopicRoostLeft