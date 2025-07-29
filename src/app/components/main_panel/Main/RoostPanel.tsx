
// IMPORTS
import { Dispatch, SetStateAction, useContext } from "react"
import { AppContext } from "@/app/page"
import { BoxLabel } from "../../style/index"

// TYPE DECLARATIONS


function RoostPanel ():React.JSX.Element {
    const { loggedInUser } = useContext(AppContext)
    
    return (
        <div className='flex flex-col h-60 w-full bg-zinc-300 rounded-xl p-2'>
            <div className='flex flex-row' >
                <BoxLabel text={'YOUR ROOST'} styling={' rounded-full'}/>
            </div>

            <div className='flex-1' />

            <div className='flex flex-row'>
            </div>

        </div>
    )
}

export default RoostPanel