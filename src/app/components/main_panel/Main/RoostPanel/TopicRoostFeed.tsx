
type topic = {
    type:string, slug:string, description:string, created_by:string,
    topic_colour:string, img_url:string,
    subscribers:Array<string>,
    created_at:string
}

type Props = {
    topic:topic
}

function TopicRoostFeed ({ topic }:Props):React.JSX.Element {
    return (
        <div className='flex flex-col w-full'>
        </div>
    )
}

export default TopicRoostFeed