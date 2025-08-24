"use-client"

// IMPORTS
import { motion } from "framer-motion"

// COMPONENTS
import { 
    CheckCircleIcon, XCircleIcon,
    QuestionMarkCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon 
} from "@heroicons/react/24/solid"
import { useState } from "react"

// TYPE DECLARATION
type Props = {
    message?:string,
    severity?: string,
    closeFn?: Function
}

function MessageCard ({ message='', severity='success', closeFn }:Props):React.JSX.Element {
    const [visible, setVisible] = useState(true)

    return (
        <div className={'flex flex-row min-w-150 w-150 h-20 bg-white rounded-sm overflow-hidden animate-message-appear '
        }>
            <div className='flex w-16 h-full bg-white'>
            { 
                severity==='success'?
                    <div className='flex w-full h-full items-center bg-green-500 place-content-center'>
                        <CheckCircleIcon className='text-white w-10 h-10' />
                    </div>
                : severity==='error'?
                    <div className='flex w-full h-full items-center bg-red-500 place-content-center'>
                        <XCircleIcon className='text-white w-10 h-10' />
                    </div>
                : severity==='attention'?
                    <div className='flex w-full h-full items-center bg-yellow-500 place-content-center'>
                        <ExclamationTriangleIcon className='text-white w-10 h-10' />
                    </div>
                : <></>
            }
            </div>

            <div className='flex flex-1 h-full'>
                <p className='font-bold text-black'>{message}</p>
            </div>

            <div className='flex flex-col py-2 px-4'>
                <button className='flex bg-white outline-1 outline-bg-zinc-500 rounded-sm p-1 w-6 h-6 place-items-center justify-center'
                    onClick={() => { setVisible(false) }}>
                    <p className='text-black align-middle'>x</p>
                </button>
            </div>
        </div>
    )
}

export default MessageCard