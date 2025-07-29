
// COMPONENTS
import { PreviousNextButton } from "./index"

import { UserIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type Props = {
    handleStateChange: Function
}

function TopBar ({ handleStateChange }:Props ):React.JSX.Element {

    return (
        <div className='flex flex-row gap-2 bg-zinc-300 p-2' >
            <div className='flex flex-row rounded-full overflow-hidden'>
                <PreviousNextButton type={'previous'} handleStateChange={handleStateChange} />
                <PreviousNextButton type={'next'} handleStateChange={handleStateChange} />
            </div>

            <div className='flex-1' />
            
            <button 
                className='w-8 h-8 bg-white outline-1 outline-bg-zinc-300 rounded-full p-1'
                onClick={() => {}}
            >
                <UserIcon className='text-black' />    
            </button>

            <button 
                className='w-8 h-8 bg-white outline-1 outline-bg-zinc-300 rounded-full p-1'
                onClick={() => {}}
            >
                <Cog6ToothIcon className='text-black' />    
            </button>
        </div>
    )
}

export default TopBar