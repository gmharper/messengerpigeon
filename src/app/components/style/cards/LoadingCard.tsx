import { SyncLoader } from "react-spinners"

type Props = {
    type:string,
    display_type?:string,
    message?:string,
    err_msg?:string,
    styling?:string
}

function LoadingCard ({ type='empty', display_type='data', message="There's nothing to see here...", err_msg='ERROR', styling='' }:Props) {
    return (
        <div className={'flex flex-col gap-6 w-90 h-32 bg-white place-items-center content-center justify-center rounded-xl '
            +'outline-1 outline-zinc-300 shadow-sm shadow-black/20 p-4 ' +(type==='loading'? 'animate-text-grow ' : '') +styling}>
        {
            type==='error'? 
            <>
                <p className='font-bold text-black text-center'>There was an error fetching {display_type}. Please try refreshing.</p>
                <p className='font-bold text-violet-500 text-center'>{`${err_msg}`}</p>
            </>
            : 
            type==='loading'? 
            <>
                <p className='font-bold text-black text-center text-lg'>Loading {display_type}</p>
                <SyncLoader color={"lime"}/> 
            </>
            :
            type==='empty'?
            <>
                <p className='font-bold text-black text-center text-lg'>{message}</p>
            </>
            :
            <></>
        }
        </div>
    )
}

export default LoadingCard