
// TYPE DECLARATIONS
type Props = {
    cardShape: string,
    error: any,
    isLoading: boolean,
    children: any,
}

function GridPanel ({ cardShape, isLoading, error, children }:Props ):React.JSX.Element {
    return (
        <div className={'grid place-content-start ' 
            + (cardShape==='row' ? ' grid grid-flow-row xl:w-248 gap-4 grid-cols-1 xl:grid-cols-2 place-items-center'
            : cardShape==='square' ? 'grid gap-y-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center' 
            : '') }>
        { isLoading ? <p className='text-black'>Loading</p> :
            <>
                { children }
            </>
        }
        </div>
    )
}

export default GridPanel