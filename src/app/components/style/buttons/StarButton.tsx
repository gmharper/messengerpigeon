
import { StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarIconS } from "@heroicons/react/24/solid"

type Props = {
    isStarred:boolean,
    setFn:Function,
    unsetFn:Function,
    width?:string,
    height?:string,
    styling?:string
}

function StarButton ({ isStarred, setFn, unsetFn, width='w-8 ', height='h-8 ', styling='' }:Props):React.JSX.Element {
    return (
        <button className={'flex bg-white rounded-sm place-items-center justify-center ' +width +height +styling}
            onClick={() => { isStarred? unsetFn() : setFn() }}>
            { isStarred ?
                <StarIconS className='h-4 text-sky-300' /> 
                :
                <StarIcon className='h-4 text-black' />
            }
        </button>
    )
}

export default StarButton