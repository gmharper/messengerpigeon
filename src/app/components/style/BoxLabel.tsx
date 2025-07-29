
"use client"

// IMPORTS
import { useContext } from "react"
import { AppContext } from "@/app/page"

// TYPE DECLARATION
type Props = {
    labelID?: string,
    children?: any,
    setFn?: Function,
    onPress?: Function,
    text?: string,
    text_colour?: string,
    colour?: string,
    width?: string,
    styling?: string,
}

function BoxLabel ({ labelID, children, text='', styling='', setFn=(() => {}), onPress=(() => {}) }:Props ):React.JSX.Element {
    
    return (
        <div className={'flex flex-row min-h-10 scale-100 content-center items-center bg-white rounded-sm px-3 hover:outline-1 outline-black ' +styling}
            onMouseEnter={() => { if (setFn) setFn({ id: labelID, type: 'hoverOver', set: true }) }}
            onMouseLeave={() => { if (setFn) setFn({ id: labelID, type: 'hoverOver', set: false }) }}
            onClick={() => {onPress(labelID)}}
        >
            <p className={'text-lg text-left font-bold text-black '}>{text}</p>
            <div className='flex-1' />
            { children ? children : <></> }
        </div>
    )
}

export default BoxLabel