// IMPORTS
import { useEffect } from "react"

// TYPE DECLARATIONS
type Props = {
    user:user
}

type user = {
    username:string, name:string, email:string, password:string, verified:boolean, description:string,
    avatar_img_url:string, banner_img_url:string,
    profile_colour:string, banner_blend:string, banner_position:string,
    articles:Array<number>, comments:Array<number>, subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>,
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

function RoostFeed ({ user }:Props) {

    useEffect(() => {
        //get subscribed articles from user
    }, [])

    return (
        <div className='flex w-full'>

        </div>
    )
}

export default RoostFeed