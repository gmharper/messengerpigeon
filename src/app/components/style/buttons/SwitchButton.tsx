
// TYPE DECLARATION
type Props = {
    type: string,
    activeType: string,
    setFn: Function,
    text?: string,
    styling?: string
}

function SwitchButton ({ type, activeType, setFn, text, styling }:Props ):React.JSX.Element {
    const button_selected:string = 'bg-blue-500 '
    const button_unselected:string = 'bg-white '

    return (
        <button 
            onClick={() => {setFn(type)}}
            className={'h-8 w-32 ' 
                +(type===activeType ? button_selected : button_unselected) +styling}
        >
    
            <p className='font-bold text-black'>{text}</p>
    
        </button>
    )
}

export default SwitchButton