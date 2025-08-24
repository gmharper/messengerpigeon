// IMPORTS

// TYPE DECLARATION
type Props = {
    labelID?: string,
    children?: any,
    setFn?: Function,
    onPress?: Function,
    text?: string,
    text_size?:string,
    text_colour?: string,
    colour?: string,
    width?: string,
    styling?: string,
}

function BoxLabel ({ labelID, children, text='', text_size='text-lg ', styling='', setFn=(() => {}), onPress=(() => {}) }:Props ):React.JSX.Element {
    
    return (
        <div className={'flex flex-row min-h-8 content-center items-center rounded-sm bg-stone-100 outline-sm outline-zinc-300 shadow-sm shadow-black/20 px-2 ' +styling}
            onMouseEnter={() => { if (setFn) setFn({ id: labelID, type: 'hoverOver', set: true }) }}
            onMouseLeave={() => { if (setFn) setFn({ id: labelID, type: 'hoverOver', set: false }) }}
            onClick={() => {onPress(labelID)}}
        >
            <p className={'text-left font-bold text-black ' +text_size}>{text}</p>
            <div className='flex-1' />
            { children ? children : <></> }
        </div>
    )
}

export default BoxLabel