
// COMPONENTS
import { HeartIcon } from "@heroicons/react/24/outline"

// TYPE DECLARATION
type Props = {
    inputObject: inputObject,
    styling: string
}

type inputObject = {
    title: string,
    img: string
}

function SquareCard ({ inputObject, styling }:Props ):React.JSX.Element {
    return (
        <div className={'flex flex-col w-70 bg-white hover:outline-1 outline-white hover:shadow-lg shadow-white rounded-xl overflow-hidden ' +styling}>
            <div className='relative flex w-full h-50 bg-zinc-300'>
                <img src={inputObject.img ? inputObject.img : ''} />

                <div className='absolute w-8 h-8 top-2 right-2 bg-white p-1'><HeartIcon className='text-black'/></div>
                <div className='absolute w-16 h-8 bottom-2 left-2 bg-white rounded-sm p-1'>
                    <p className='font-bold text-black'>Hello</p>
                </div>
            </div>
            
            <div className='flex flex-col w-full h-30 bg-zinc-900 p-1'>
                <div className='flex flex-row'>
                    <p>{inputObject.title}</p>
                </div>

                <div className='flex flex-row'>

                </div>
            </div>
        </div>
    )
}

export default SquareCard