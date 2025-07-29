
type Props = {
    child: any,
    styling?: string
}

function IconContainer ({ child, styling }:Props ):React.JSX.Element {
    return (
        <div className={'flex w-8 h-8 outline-1 outline-black-200 rounded-lg p-2 content-center items-center ' +styling}>
            { child }
        </div>
    )
}

export default IconContainer