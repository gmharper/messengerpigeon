// IMPORTS
import { Dispatch, Profiler, Reducer, SetStateAction, useContext, useEffect, useReducer, useRef, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { Tooltip } from "react-tooltip";

// COMPONENTS
import { RoostPanel } from "../Main/index"
import { DualButton, MessageCard } from "../../style/index"

import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/solid"

import { HexColorPicker } from "react-colorful"
import { Toast } from "primereact/toast"

// SCRIPTS
import { patchUser } from "@/app/scripts/patch/index"

// TYPE DECLARATIONS
type ProfileProps = {
    dummyProfile:user,
    setDummyProfile:any
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

const defaultUser = {
    type: 'user',
    username: 'default_username', name: 'default_name', email: 'user@messengerpigeon.com', description: 'default_description',
    avatar_img_url: 'default_avatar', banner_img_url: 'default_banner',
    profile_colour: 'white', banner_blend: 'normal', banner_position: 'center',
    comments: [], articles: [], subscribed_topics: [],
    followers: [], following: [],
    voted_comments: [], voted_articles: [],
    created_at: ''
}

// STYLING
let profile_label = 'flex w-50 h-8 bg-stone-100 rounded-sm p-2 items-center outline-1 outline-zinc-300 shadow-sm shadow-black/20'
let color_label = 'w-64 h-8 rounded-sm'

const blendModes = [
    { type: 'normal', name: 'NONE' },
    { type: 'multiply', name: 'MULTIPLY' },
    { type: 'screen', name: 'SCREEN' },
    { type: 'overlay', name: 'OVERLAY' },
    { type: 'darken', name: 'LIGHTEN' },
    { type: 'color-dodge', name: 'COLOUR DODGE' },
    { type: 'color-burn', name: 'COLOUR BURN' },
    { type: 'hard-light', name: 'HARD LIGHT' },
    { type: 'soft-light', name: 'SOFT LIGHT' },
    { type: 'difference', name: 'DIFFERENCE' },
    { type: 'exclusion', name: 'EXCLUSION' },
    { type: 'hue', name: 'HUE' },
    { type: 'saturation', name: 'SATURATION' },
    { type: 'color', name: 'COLOUR' },
    { type: 'luminosity', name: 'LUMINOSITY' },
]

const positions = [
    { type: 'center', name: 'CENTRE' },
    { type: 'bottom', name: 'TOP' },
    //{ type: '-50% -50%', name: 'Top Right' },
    { type: 'left', name: 'RIGHT' },
    //{ type: '50% 50%', name: 'Bottom Right' },
    { type: 'top', name: 'BOTTOM' },
    //{ type: 'bottom-left', name: 'Bottom Left'},
    { type: 'right', name: 'LEFT' },
    //{ type: 'top-left', name: 'Top Left' }
]


function Profile ({ dummyProfile, setDummyProfile }:ProfileProps):React.JSX.Element {
    const { loggedInUsername, loggedInUser, setLoggedInUser, params, setParams } = useContext(AppContext)
    const resetMessage = useRef(null)
    
    const [saveLoading, setSaveLoading] = useState(false)
    const [saveError, setSaveError] = useState(null)

    const [profileVisibility, setProfileVisibility] = useState('public')
    const [profileBorder, setProfileBorder] = useState(true)
    
    const [showColorPicker, setShowColorPicker] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const userStyling = {
        profile_color_label: {
            backgroundColor: dummyProfile.profile_colour
        }
    }

    function handleNameChange (e:any) {
        setDummyProfile({ name: e.target.value})
    }
    function handlePasswordChange (e:any) {
        setDummyProfile({ password: e.target.value })
    }
    function handleEmailChange (e:any) {
        setDummyProfile({ email: e.target.value })
    }

    function handleSave () {
        // make checks
        if (!dummyProfile.name) return setNameError(true)
        if (!dummyProfile.password) return setPasswordError(true)
        if (!dummyProfile.email) return setEmailError(true)
        
        if (dummyProfile.password.length < 8) return setPasswordError(true)


        // patchUser(loggedInUsername, dummyProfile, setSaveLoading, setSaveError)
        // .then((res) => {
        //     console.log(res)
        //     setLoggedInUser(dummyProfile)
        // })
        // .catch((err) => {

        // })
        // .finally()
    }

    function handleReset () {
        setDummyProfile(loggedInUser)

        setNameError(false)
        setPasswordError(false)
        setEmailError(false)
        //resetMessage.current.show({ severity: 'success', position: 'bottom-center' })
    }

    useEffect(() => {
        setParams({ heading: 'PROFILE' })
        setDummyProfile(loggedInUser)
    }, [])


    return (
        <div className='relative flex flex-col w-full gap-2 px-4 py-12'>
            {/* <div className='z-200 fixed flex m-auto bottom-10 translate-x-75 invisible '>
                <MessageCard message={''} severity={'success'} />
            </div> */}
            <div className='absolute flex flex-col gap-4 top-5 right-5'>
                <button 
                    className='w-12 h-12 rounded-lg bg-white p-2'
                    onClick={() => { handleSave() }}
                    data-tooltip-id='confirm'
                    data-tooltip-content='Confirm Changes'
                    data-tooltip-place='left'
                >
                    <CheckIcon className='text-green-500' />
                </button>

                <button 
                    className='w-12 h-12 rounded-lg bg-white p-2'
                    onClick={() => { handleReset() }}
                    data-tooltip-id='reset'
                    data-tooltip-content='Reset Changes'
                    data-tooltip-place='left'
                >
                    <ArrowUturnLeftIcon className='text-zinc-500' />
                </button>
            </div>
            <Tooltip id='confirm' style={{ zIndex:200, backgroundColor:'white', color:'black' }}/>
            <Tooltip id='reset' style={{ zIndex:200, backgroundColor:'white', color:'black' }}/>

            <div className='flex flex-col gap-2 w-full px-16 2xl:px-32'>
                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>NAME</p>
                    </div>
                    <input
                        onChange={(e) => { handleNameChange(e) }}
                        onFocus={() => { setNameError(false) }}
                        onBlur={() => { setNameError(false) }}
                        className={'flex-1 bg-zinc-800 outline-1 rounded-sm px-2 ' +(nameError? 'outline-red-500' : 'outline-zinc-700')} 
                        type='text' 
                        value={dummyProfile? dummyProfile.name? dummyProfile.name : '' : ''}
                        placeholder={'Enter a name for you to be displayed as.'}
                    />
                </div>

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>PASSWORD</p>
                    </div>
                    <input
                        onChange={(e) => { handlePasswordChange(e) }}
                        onFocus={() => { setPasswordError(false) }}
                        onBlur={() => { setPasswordError(false) }}
                        className='flex-1 bg-zinc-800 outline-1 outline-zinc-700 rounded-sm px-2' 
                        type='password'
                        value={dummyProfile? dummyProfile.password ? dummyProfile.password : '' : ''}
                        placeholder={'Enter your password.'} 
                    />
                </div>

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>EMAIL</p>
                    </div>
                    <input
                        onChange={(e) => { handleEmailChange(e) }}
                        onFocus={() => { setEmailError(false) }}
                        onBlur={() => { setEmailError(false) }}
                        className='flex-1 bg-zinc-800 outline-1 outline-zinc-700 rounded-sm px-2' 
                        type='email'
                        value={dummyProfile? dummyProfile.email ? dummyProfile.email : '' : ''}
                        placeholder={'Enter your email.'} 
                    />
                </div>

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>DESCRIPTION</p>
                    </div>
                    <textarea
                        className='flex-1 min-h-8 h-32 max-h-32 bg-zinc-800 outline-1 outline-zinc-700 rounded-sm p-2' 
                        value={dummyProfile? dummyProfile.description? dummyProfile.description : '' : ''}
                        onChange={(e) => { setDummyProfile({ description: e.target.value })}}
                        placeholder={'Enter a brief description of yourself so that others can know a little bit about you!'} 
                    />
                </div>

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>VISIBILITY</p>
                    </div>
                    <DualButton 
                        id_left={'public'} id_right={'private'} 
                        text_left={'Public'} text_right={'Private'} 
                        state={profileVisibility} setState={setProfileVisibility} styling='w-64'
                    />
                </div>

                <div className=' h-[1px] bg-zinc-500 my-4'/>

                {/* <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>ROOST BORDER</p>
                    </div>
                    <DualButton 
                        id_left={true} id_right={false} 
                        text_left={'Show'} text_right={'Hide'} 
                        state={profileBorder} setState={setProfileBorder} styling='w-64'
                    />
                </div> */}

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>ROOST COLOUR</p>
                    </div>
                    <button style={userStyling.profile_color_label} 
                        className={color_label}
                        onClick={() => { setShowColorPicker(!showColorPicker) }}
                    />

                    <div className={'z-40 absolute right-0 rounded-xl p-1 bg-zinc-700 '+ (showColorPicker ? 'visible' : 'invisible')}
                    onBlur={() => { setShowColorPicker(false) }}>
                        <HexColorPicker 
                            color={dummyProfile? dummyProfile.profile_colour? dummyProfile.profile_colour : 'white' : 'white'} 
                            onChange={(e) => { setDummyProfile({ profile_colour: e }) }} />      
                    </div>
                </div>

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>AVATAR IMAGE URL</p>
                    </div>
                    <textarea
                        className='flex-1 min-h-8 h-24 max-h-24 bg-zinc-800 outline-1 outline-zinc-700 rounded-sm p-2' 
                        value={dummyProfile? dummyProfile.avatar_img_url? dummyProfile.avatar_img_url : '' : ''}
                        placeholder={'Enter the url link for your avatar image.'} 
                    />
                </div>

                <div className='relative flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>BANNER IMAGE URL</p>
                    </div>
                    <textarea
                        className='flex-1 min-h-8 h-24 max-h-24 bg-zinc-800 outline-1 outline-zinc-700 rounded-sm p-2' 
                        value={dummyProfile? dummyProfile.banner_img_url? dummyProfile.banner_img_url : '' : ''}
                        placeholder={'Enter the url link for your banner image.'} 
                    />
                </div>

                <div className='flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>BANNER BLEND</p>
                    </div>
                    <select
                        className='flex w-64 bg-zinc-800 rounded-sm text-sm text-center cursor-pointer' 
                        defaultValue={loggedInUser.banner_blend}
                        onChange={ e => setLoggedInUser({ banner_blend: e.target.value }) }
                    >
                    { 
                        blendModes.map((mode) => {
                            return <option value={mode.type}>{mode.name}</option>
                        }) 
                    }
                    </select>
                </div>

                <div className='flex flex-row gap-2'>
                    <div className={profile_label}>
                        <p className='font-bold text-black text-sm'>BANNER POSITION</p>
                    </div>
                    <select
                        className='flex w-64 bg-zinc-800 rounded-sm text-sm text-center cursor-pointer' 
                        defaultValue={loggedInUser.banner_position}
                        onChange={ e => setLoggedInUser({ banner_position: e.target.value}) }
                    >
                    { 
                        positions.map((position) => {
                            return <option value={position.type}>{position.name}</option>
                        }) 
                    }
                    </select>
                </div>

                {/* <div className='flex flex-row gap-2 justify-center mt-8'>
                    <button className='w-32 h-8 rounded-sm bg-green-400'
                    onClick={() => { handleSave() }}>
                        <p className='font-bold text-black'>SAVE</p>
                    </button>

                    <button className='w-32 h-8 rounded-sm bg-zinc-400'
                    onClick={() => { handleReset() }}>
                        <p className='font-bold text-black'>RESET</p>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Profile