"use client"

// IMPORTS
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

// TYPE DECLARATION
type Props = {
    text?: string,
    styling?: string,
    hasBeenFlipped?: boolean
}

function InfoTextPanel ({ text, styling, hasBeenFlipped=false }:Props ):React.JSX.Element {
    let textArray = (text ? text.split("") : [])

    let ref = useRef(null)
    let isInView = useInView(ref)

    return (
        <div className={styling}>
            <motion.p
                ref={ref}
                style={{ color: 'black' }}
                className='text-left font-pixel_operator w-full h-full'
                variants={{
                    visible: {opacity: hasBeenFlipped ? 1 : 0}, hidden: {opacity: 0}
                }}
                transition={{ staggerChildren: 0.02 }}
                initial={{ opacity: 0 }}
            >
                { textArray.map((char, index) => {
                    return <motion.span
                        key={char+index}
                        className='' 
                        transition={{ duration: 0 }}
                        initial={{ opacity: 0 }}
                        variants={{ 
                            visible: { opacity: hasBeenFlipped ? 1 : 0 }, hidden: { opacity: 0 }
                        }}
                    >
                        {char}
                    </motion.span >
                }) }
            </motion.p >
        </div>
    )
}

export default InfoTextPanel