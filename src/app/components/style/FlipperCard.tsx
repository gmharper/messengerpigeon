"use client"

import { Dispatch, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

// TYPE DECLARATION
type Props = {
    id: string,
    front: React.JSX.Element,
    back: React.JSX.Element,
    setFlipped: Function
}

function FlipperCard ({ id, front, back, setFlipped }:Props ):React.JSX.Element {
    const [mouseOver, setMouseOver] = useState(false)

    let ref = useRef(null)
    let isInView = useInView(ref)

    return (
        <motion.div onMouseOver={() => {
            setMouseOver(true)
            setFlipped({ id: id, hasBeenFlipped: true })
        }}
            ref={ref}
            onMouseOut={() => {setMouseOver(false)}}
            variants={{ 
                'hidden': {
                    opacity: 0.1
                },
                'visible': {
                    opacity: 1
                }
            }}
            initial={{ opacity: 0 }}
            animate={ isInView ? 'visible' : 'hidden'}
            transition={{ duration: 1 }}
            id={id}>
            <div
                className={`relative flex w-100 h-100 rounded-xl flippercard ${mouseOver ? 'flip' : ''}`} 
                onClick={() => { if (mouseOver) return }}
            >

                <div className='z-10 front rounded-xl overflow-hidden'>
                    {front}
                </div> 

                <div className='z-10 back rounded-xl overflow-hidden'>
                    {back}
                </div>

                <div className={'z-0 absolute w-full h-full rounded-xl ' +(mouseOver ? 'outline-16 bg-radial from-green-500 to-green-500/0 outline-green-500 outline-double animate-pulsing' : '')} />
            </div>
        </motion.div>
    )
}

export default FlipperCard