import { useContext } from "react"
import { ThemeContext } from "@/app/page"

// TYPE DECLARATION
type Props = {
    type: string
    children: React.JSX.Element,
    bg_colour?: string,
    height?: string,
    styling?: string
}

function RowCard({ type='user', children, bg_colour=" bg-zinc-200 ", height=" h-20 ", styling }:Props ):React.JSX.Element {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={'flex flex-row w-180 xl:w-full rounded-sm overflow-hidden bg-zinc-200 shadow-md shadow-black/10 ' +height +styling} >
            { children }
        </div>
    )
}

export default RowCard