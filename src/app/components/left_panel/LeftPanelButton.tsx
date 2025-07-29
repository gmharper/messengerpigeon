
// IMPORTS
import { Dispatch, SetStateAction, useContext } from "react"
import { AppContext } from "@/app/page"

// TYPE DECLARATIONS
type Props = {
    id: string,
    text?: string,
    icon?: React.JSX.Element,
    styling?: string,
    onPress: Function
}

function LeftPanelButton({ id, text, icon, styling, onPress }:Props ):React.JSX.Element {
    const { getWindowSize } = useContext(AppContext)

    return (
        <button id={id} 
            className={'flex flex-shrink h-10 content-center items-center p-2 ' +styling}
            onClick={() => {onPress(id)}}>
            { icon }
            { getWindowSize()[0] >= 1024 ?
                <p className='font-bold text-right text-center text-black px-2'>{ text }</p>
                : <></>
            }
        </button>
    )
}

export default LeftPanelButton