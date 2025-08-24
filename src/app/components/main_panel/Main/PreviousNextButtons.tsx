// IMPORTS
import { Dispatch, SetStateAction, useContext } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// COMPONENTS
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type Props = {
    type?: string,
    currentPage?: number,
    maxPage?: number,
}

function PreviousNextButton ({ type, currentPage=0, maxPage=10 }:Props ):React.JSX.Element {
    const { params, setParams } = useContext(AppContext)
    
    function handlePageChange (type:string) {
        switch (type) {
            case 'previous':
                if (currentPage === 0) return
                else setParams({ page: currentPage-1})
                break;
            case 'next':
                if (currentPage === maxPage) return
                else setParams({ page: currentPage+1 })
                break;
            default:
                return
        }
    }

    return (
        <>
        { 
        type==='previous' ?
            <button className='flex w-16 h-8 bg-white rounded-xs justify-center p-1'
            onClick={() => {handlePageChange('previous')}}>
                <ArrowLeftIcon className='flex h-full aspect-square text-black'/>
            </button> 
        :
        type==='next' ?
            <button className='flex w-16 h-8 bg-white rounded-xs justify-center p-1'
            onClick={() => {handlePageChange('next')}}>
                <ArrowRightIcon className='flex h-full aspect-square text-black'/>
            </button> :
            <></> 
        }
        </>
    )
}

export default PreviousNextButton