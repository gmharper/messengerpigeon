
// IMPORTS
import { Dispatch, SetStateAction, useContext } from "react"
import { AppContext } from "@/app/page"

// TYPE DECLARATIONS
type Props = {
    id: string,
    text?: string,
    icon?: React.JSX.Element,
    height?:string
    styling?: string,
    selected?: boolean,
    button_params: any,
    onPress: Function
}

function LeftPanelButton({ id, text, icon, height='h-10 ', styling, selected, button_params, onPress }:Props ):React.JSX.Element {
    const { getWindowSize, params } = useContext(AppContext)

    return (
        <button id={id} 
            className={'flex w-full content-center items-center rounded-sm shadow-sm shadow-black/20 p-2 mb-2 ' +(selected ? 'bg-violet-500 ' : 'bg-stone-100 ' ) +height +styling}
            onClick={() => {
                onPress(button_params)
            }}>
            { icon }
            { getWindowSize()[0] >= 1024 ?
                <p className={'font-bold text-right text-center px-2 ' +(selected? 'text-white' : 'text-black')}>{ text }</p>
                : <></>
            }
        </button>
    )
}

export default LeftPanelButton