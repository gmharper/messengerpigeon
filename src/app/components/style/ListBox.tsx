
// TYPE DECLARATION
type Props = {
    child?: React.JSX.Element,
    index?: number
}

function ListBox ({ child=<></>, index=0 }:Props ):React.JSX.Element {
    return (
        <div className={'flex flex-row w-full h-16 ' +(index%2===0 ? 'bg-zinc-700' : 'bg-zinc-800')}>
            { child }
        </div>
    )
}

export default ListBox