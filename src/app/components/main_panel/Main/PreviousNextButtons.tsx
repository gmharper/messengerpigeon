
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type Props = {
    type?: string,
    handleStateChange: Function
}

function PreviousNextButton ({ type, handleStateChange }:Props ):React.JSX.Element {
    return (
        <>
        { 
        type==='previous' ?
            <button className='flex w-16 h-8 bg-white rounded-xs justify-center p-1'
            onClick={() => {handleStateChange('previous')}}>
                <ArrowLeftIcon className='flex h-full aspect-square text-black'/>
            </button> 
        :
        type==='next' ?
            <button className='flex w-16 h-8 bg-white rounded-xs justify-center p-1'
            onClick={() => {handleStateChange('next')}}>
                <ArrowRightIcon className='flex h-full aspect-square text-black'/>
            </button> :
            <></> 
        }
        </>
    )
}

export default PreviousNextButton