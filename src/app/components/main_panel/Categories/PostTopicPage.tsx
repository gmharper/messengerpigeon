// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { AppContext } from "@/app/page"

// TYPE DECLARATIONS
type TopicProps = {
    setHeading: Dispatch<SetStateAction<string>>
}

function PostTopicPage ():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    function postNewTopic () {

    }

    useEffect(() => {
        setParams({ heading: 'CREATE NEW TOPIC' })
    }, [])

    return (
        <>
        </>
    )
}

export default PostTopicPage