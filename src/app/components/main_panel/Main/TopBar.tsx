
// COMPONENTS
import { PreviousNextButton } from "./index"

import { UserIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type Props = {
    handleStateChange: Function
}

function TopBar ({ handleStateChange }:Props ):React.JSX.Element {

    return (
        <div className='flex flex-row gap-2 bg-linear-to-r from-green-800 to-lime-600 p-2 border-b-1 border-zinc-400' >
            <div className='flex flex-row rounded-full overflow-hidden'>
                <PreviousNextButton type={'previous'} />
                <PreviousNextButton type={'next'} />
            </div>

            <div className='flex-1' />
            
            
        </div>
    )
}

export default TopBar