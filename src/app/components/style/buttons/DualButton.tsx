import { Dispatch, SetStateAction } from "react"

type DualButtonProps = {
    id_left:string | boolean,
    id_right:string | boolean,
    text_left?:string,
    text_right?:string,
    state:string,
    setState: Dispatch<SetStateAction<string | boolean>>,
    styling?:string
}

    function DualButton ({ id_left, id_right, text_left, text_right, state, setState, styling }:DualButtonProps) {
        return (
            <div className={'flex rounded-lg outline-1 outline-zinc-300 overflow-hidden ' +styling}>
                <button 
                    className={ 'flex-1 px-4 ' +(state===id_left? 'bg-sky-500' : 'bg-white')}
                    onClick={() => {
                    setState(id_left)
                }}>
                    <p className='text-black'>{text_left? text_left : ''}</p>
                </button>

                <button 
                    className={ 'flex-1 px-4 ' +(state===id_right? 'bg-sky-500' : 'bg-white')}
                    onClick={() => { setState(id_right) }}>
                    <p className='text-black'>{text_right? text_right : ''}</p>
                </button>
            </div>
        )
    }

    export default DualButton