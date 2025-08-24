
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconS } from "@heroicons/react/24/solid"

type Props = {
    isLiked:boolean,
    setFn:Function,
    unsetFn:Function,
    width?:string,
    height?:string,
    styling?:string
}

function LikeButton ({ isLiked, setFn, unsetFn, width='w-8 ', height='h-8 ', styling='' }:Props):React.JSX.Element {
    return (
        <button className={'flex bg-white rounded-sm place-items-center justify-center ' +width +height +styling}
        onClick={() => { isLiked ? unsetFn() : setFn() }}>
            { isLiked ?
                <HeartIconS className='h-4 text-sky-300' />
                :
                <HeartIcon className='h-4 text-black' />
            }
        </button>
    )
}

export default LikeButton