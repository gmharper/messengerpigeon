
// TYPE DECLARATION
type Props = {
    children: React.JSX.Element,
    styling: string
}

function RowCard({ children, styling }:Props ):React.JSX.Element {
    return (
        <div className={'flex flex-row rounded-xl overflow-hidden ' +styling} >
            { children }
        </div>
    )
}

export default RowCard