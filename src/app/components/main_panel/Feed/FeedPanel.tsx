
// IMPORTS
import { useEffect, useState } from "react"

// TYPE DECLARATIONS
type AppProps = {
    user: user,
    sort: string,
    order: string,
    page: number,
    filters: any
}

type user = {} | null

function FeedPanel ({ user, sort, order, page, filters }:AppProps ):React.JSX.Element {
    const [feed, setFeed] = useState(null)


    // we need to get the user's subscriptions
    // and set the feed according to this

    useEffect(() => {
        //setFeed
    }, [])

    return (
        <div></div>
    )
}

export default FeedPanel