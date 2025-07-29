
// TYPE DECLARATIONS
type Props = {
    cardShape: string,
    error: any,
    isLoading: boolean,
    children: any,
}

function GridPanel ({ cardShape, isLoading, error, children }:Props ):React.JSX.Element {
    return (
        <div className={'grid ' 
            + cardShape==='row' ? ' grid grid-flow-row gap-2 grid-cols-1 2xl:grid-cols-2 ' 
            : cardShape==='square' ? 'grid gap-y-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center' 
            : '' }>
        { isLoading ? <p className='text-black'>Loading</p> :
            <>
                { children }
            </>
        }
        </div>
    )
}

export default GridPanel