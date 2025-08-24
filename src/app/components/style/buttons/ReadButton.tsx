
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type Props = {
    text:string,
    Fn:Function
}

function ReadButton ({ text, Fn }:Props):React.JSX.Element {
    return (
        <button className={'flex h-6 bg-linear-to-br bg-fuchsia-500 outline-1 outline-indigo-500 rounded-sm items-center px-2'}
            onClick={() => { Fn() }}>

            <p className='font-bold text-white text-sm mr-4'>{ text }</p>
            <div className='flex-1' />
            <ChevronDoubleRightIcon className='text-white h-4'/>
        </button>
    )
}

export default ReadButton