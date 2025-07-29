
"use client"

// IMPORTS
import { useState } from "react"

// TYPE DECLARATION
type Props = {
    children: React.JSX.Element,
    face?: string,
    styling?: string
}

function ProjectCard ({ children=<></>, face='front', styling }:Props ):React.JSX.Element {
    return (
        <div className={`flex w-100 h-100 ${(face==='front') ? 'bg-stone-100' : 'bg-radial from-zinc-800 to-zinc-900'} ${styling}` }>
            { children }
        </div>
    )
}

export default ProjectCard