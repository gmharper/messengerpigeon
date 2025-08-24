// IMPORTS
import { useContext } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext"
import { StateContext } from "@/app/state"

// COMPONENTS
import { UserIcon, PencilSquareIcon } from "@heroicons/react/24/solid"

function RightPanel ():React.JSX.Element {
    const { setCurrentState } = useContext(StateContext)
    const { theme } = useContext(ThemeContext)

    function openPostArticle () {
        const postArticleState = {
            display_type: "post_article",
            heading: "CREATE NEW ARTICLE",
            roost_type: 'user',
            disable_roost: false,
            show_function_bar: false,
            show_heading: true
        }
        setCurrentState(postArticleState)
    }

    function openPostTopic () {
        const postTopicState = {
            display_type: "post_topic",
            heading: "CREATE NEW TOPIC",
            roost_type: 'topic',
            disable_roost: false,
            show_function_bar: false,
            show_heading: true
        }
        setCurrentState(postTopicState)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='h-16' />
            <button 
                className={'w-16 h-16 lg:w-16 lg:h-16 p-2 rounded-sm outline-1 outline-gray-300 shadow-lg' +theme.base}
                onClick={() => { openPostArticle() }}>
                <PencilSquareIcon className={theme.text}/>
            </button>

            <button 
                className={'w-16 h-16 lg:w-16 lg:h-16 p-2 rounded-sm outline-1 outline-gray-300 shadow-lg' +theme.base}
                onClick={() => { openPostTopic() }}>
                <PencilSquareIcon className={theme.text}/>
            </button>
        </div>
    )
}

export default RightPanel