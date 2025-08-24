// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// TYPE DECLARATIONS
type SettingsProps = {
    dummyProfile:user
    setDummyProfile: any
}

type user = {
    type:string, username: string, name: string, password:string, verfified:boolean, email:string, description:string,
    avatar_img_url: string, banner_img_url:string,
    profile_colour:string, banner_blend:string, banner_position:string,
    comments:Array<number>, articles:Array<number>, 
    subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>,
    voted_comments:Array<number>, voted_articles:Array<number>,
    created_at:string
}

function Settings ({ dummyProfile, setDummyProfile }:SettingsProps):React.JSX.Element {
    const { loggedInUser } = useContext(AppContext)

    return (
        <div>

        </div>
    )
}

export default Settings