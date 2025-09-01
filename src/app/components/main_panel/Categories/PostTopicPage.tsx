// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// COMPONENTS
import { BoxLabel } from "../../style";
import { Tooltip } from "react-tooltip";
import { Editor } from "primereact/editor";
import { HexColorPicker } from "react-colorful";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

// TYPE DECLARATIONS
type TopicProps = {
    setHeading: Dispatch<SetStateAction<string>>
}

const default_topic = {
    slug: '', name: '', description: '', created_by: '',
    topic_colour: '',
    subscribers: [], articles: [], comments: [],
    img_url: '',
    created_at: ''
}

function PostTopicPage ():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    const topicReducer = (state:any, action:any) => {
        const newTopic = {...state}

        for (const key in default_topic) {
            if (action[key]) newTopic[key] = action[key]
        }

        return newTopic
    }

    const [newTopic, setNewTopic] = useReducer(topicReducer, default_topic)

    function postNewTopic () {
        // make call to db
    }

    useEffect(() => {
        setParams({ heading: 'CREATE NEW TOPIC' })
    }, [])

    return (
        <div className='flex flex-col w-full items-center p-16'>
            <div className='flex flex-col w-full gap-4 items-center content-center justify-center 2xl:px-32'>
                <div className='flex flex-row gap-2 w-full'>
                    <BoxLabel text='TOPIC ID' styling=' bg-white min-w-50 ' text_size=" text-sm"/>
                    <input 
                        className='flex w-full h-8 bg-zinc-800 text-white outline-1 outline-zinc-700 px-2 text-sm rounded-sm overflow-hidden '
                        placeholder={"Enter topic id..."} 
                        onChange={(e) => { setNewTopic({ slug: e.target.value }) }} />
                        
                    <div className='min-w-8 h-8 bg-white outline-1 outline-zinc-300 rounded-sm p-1'
                        data-tooltip-id='topic_id' 
                        data-tooltip-content="Topic id's must be ALL lower case and spaces replaced
                        with underscores. Like this! -> jazz, manchester_united, space_exploration, ghost_stories ...."
                    >
                        <QuestionMarkCircleIcon className='w-full h-full text-black'/>
                    </div>

                    <Tooltip id='topic_id' style={{ display: 'inline', width: '300px', textAlign: 'center' }}/>
                </div>

                <div className='flex flex-row w-full gap-2 mb-8'>
                    <BoxLabel text='TOPIC NAME' styling=' bg-white min-w-50 ' text_size=" text-sm"/>
                    <input 
                        className='flex w-full h-8 bg-zinc-800 text-white outline-1 outline-zinc-700 px-2 text-sm rounded-sm overflow-hidden '
                        placeholder={"Enter topic name..."} 
                        onChange={(e) => { setNewTopic({ slug: e.target.value }) }}/>
                </div>

                <div className='flex flex-col gap-2 w-full mb-8'>
                    <BoxLabel text='TOPIC DESCRIPTION' styling=' bg-white w-full ' text_size=" text-sm"/>
                    <div className='bg-white '>
                        <Editor placeholder={'Enter your topic description...'} onTextChange={(e) => console.log(e.htmlValue)} 
                            style={{ 
                                color: 'black',
                                height: '160px',
                            }} 
                        />
                    </div>
                </div>

                <div className='flex flex-row gap-2 w-full items-center mb-8'>
                    <BoxLabel text='TOPIC COLOUR' styling='min-w-50 bg-white px-2' text_size=" text-sm"/>
                    <HexColorPicker 
                        color={'white'}
                        onChange={(e) => { setNewTopic({ topic_colour: e }) }} />      
                </div>

                <div className='flex flex-row gap-2 w-full mb-8'>
                    <BoxLabel text='TOPIC IMAGE URL' styling='min-w-50 bg-white px-2' text_size=" text-sm"/>
                    <input className='w-full h-8 bg-zinc-800 text-white outline-1 outline-zinc-700 text-sm rounded-sm px-2 overflow-hidden'
                    placeholder={"Enter topic image url..."}
                    onChange={(e) => { 
                        setNewTopic({ img_url: e.target.value }) 
                    }} />
                </div>

                <button className='w-full h-12 rounded-center bg-green-400 font-bold text-white rounded-sm shadow-sm shadow-black/20'
                    onClick={() => { postNewTopic() }}>
                    CREATE TOPIC
                </button>
            </div>
        </div>
    )
}

export default PostTopicPage