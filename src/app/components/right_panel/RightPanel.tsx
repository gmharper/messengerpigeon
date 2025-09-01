// IMPORTS
import { useContext } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext"
import { StateContext } from "@/app/state"
import { Tooltip } from "react-tooltip"

// COMPONENTS
import { UserIcon, PencilSquareIcon,
    NewspaperIcon, TagIcon, PlusIcon
 } from "@heroicons/react/24/solid"

function RightPanel ():React.JSX.Element {
    const { params } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)
    const { theme } = useContext(ThemeContext)

    function openPostArticle () {
        const postArticleState = {
            display_type: "post_article",
            heading: "CREATE NEW ARTICLE",
        }
        setCurrentState(postArticleState)
    }

    function openPostTopic () {
        const postTopicState = {
            display_type: "post_topic",
            heading: "CREATE NEW TOPIC",
        }
        setCurrentState(postTopicState)
    }

    return (
        <div className='flex flex-col place-items-center'>
            <div className='h-16' />
            <button 
                className={'relative w-16 h-16 lg:w-16 lg:h-16 p-2 rounded-sm outline-1 outline-gray-300 shadow-lg '
                    +(params.display_type==='post_article'? 'bg-violet-500' : theme.base)}
                onClick={() => { openPostArticle() }}
                data-tooltip-id='post_article'
                data-tooltip-content='Post an Article'
                data-tooltip-place="right"
            >
                <NewspaperIcon className={params.display_type==='post_article'? ' text-white' : theme.text}/>
                <p className={'absolute font-bold -top-1 right-1 text-2xl ' 
                    +(params.display_type==='post_article'? ' text-white' : theme.text)}>+</p>
                {/* <PlusIcon className='absolute font-bold top-[0.5px] right-[0.5px] w-6 h-6 ' /> */}
            </button>
            <Tooltip id='post_article' style={{backgroundColor: 'white', color: 'black'}} />

        
            {/* <div className='w-8 h-[2px] bg-white' /> */}
            <div className='flex w-[2px] h-4 bg-white place-items-center' />
            {/* <div className='w-8 h-[2px] bg-white'  /> */}

            <button 
                className={'relative w-16 h-16 lg:w-16 lg:h-16 p-2 rounded-sm outline-1 outline-gray-300 shadow-lg ' 
                    +(params.display_type==='post_topic'? 'bg-violet-500' : theme.base)}
                onClick={() => { openPostTopic() }}
                data-tooltip-id='post_topic'
                data-tooltip-content='Create a Topic'
                data-tooltip-place="right"
            >
                <TagIcon className={params.display_type==='post_topic'? ' text-white' : theme.text}/>
                <p className={'absolute font-bold -top-1 right-1 text-2xl ' 
                    +(params.display_type==='post_topic'? ' text-white' : theme.text)}>+</p>
            </button>
            <Tooltip id='post_topic' style={{backgroundColor: 'white', color: 'black'}} />
        </div>
    )
}

export default RightPanel