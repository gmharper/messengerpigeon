// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// COMPONENTS
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type HeadingProps = {
    heading:string,
    page:number,
    maxPage:number,
}

function HeadingBar ({ heading, page, maxPage }:HeadingProps):React.JSX.Element {
    const { params, setParams } = useContext(AppContext) 
    const { theme } = useContext(ThemeContext)

    function previousPage () {
        let newPage = 0

        if (page===0) return

        newPage = page-1
        setParams({ page: newPage })
    }

    function nextPage () {
        let newPage = 0

        if (page===maxPage) return

        newPage = page+1
        setParams({ page: newPage })
    }

    useEffect(() => {

    }, [heading])

    return (
        <div className='flex flex-row w-full h-10'>
            <div className={'flex w-100 h-full bg-violet-500 rounded-sm shadow-md shadow-black/20 items-center content-center px-4 '}>
                <p className='font-bold text-white'>{heading}</p>
            </div>

            <div className='flex-1' />

            <div className='flex flex-row'>
                <button className='w-16 h-full bg-white rounded-l-sm shadow-md shadow-black/20 place-items-center outline-1 outline-zinc-300'
                onClick={() => { previousPage() }}>
                    <ChevronLeftIcon className='text-black h-6' />
                </button>

                <button className='w-16 h-full bg-white rounded-r-sm shadow-md shadow-black/20 place-items-center outline-1 outline-zinc-300'
                onClick={() => { nextPage() }}>
                    <ChevronRightIcon className='text-black h-6' />
                </button>
            </div>
        </div>
    )
}
export default HeadingBar