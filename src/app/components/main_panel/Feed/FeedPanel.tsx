// IMPORTS
import { useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { getUserByUsername, getTopics, getArticles } from "@/app/scripts/fetch"

// TYPE DECLARATIONS
type user = {} | null

function FeedPanel ():React.JSX.Element {
    const { loggedInUsername, params, setParams } = useContext(AppContext)

    const [storedUser, setStoredUser] = useState(null)
    const [feed, setFeed] = useState(null)

    const [userLoading, setUserLoading] = useState(false)
    const [userError, setUserError] = useState(null)

    const [feedLoading, setFeedLoading] = useState(false)
    const [feedError, setFeedError] = useState(null)

    // we need to get the user's subscriptions
    // and set the feed according to this

    function filterFeed () {
        return
    }

    useEffect(() => {
        setParams({ heading: 'YOUR FEED' })

        getUserByUsername(loggedInUsername, setStoredUser, setUserLoading, setUserError)
        .then((user) => {
            const userTopics = user.subscribed_topics
            const userFollowing = user.following
            //const userGames = user.subscribed_games

            //getTopics
        })
        .then(() => {

        })

        //setFeed

        //fetch user subscribed topics
        //fetch user following users
    }, [])

    return (
        <div className='p-8'>

        </div>
    )
}

export default FeedPanel