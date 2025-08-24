
import { createContext, Dispatch, SetStateAction } from "react"

export const StateContext = createContext<StateContext>({} as StateContext)

interface StateContext {
    setCurrentState: Dispatch<SetStateAction<any>>,
    setStateToDefault: Dispatch<SetStateAction<any>>
}

type Props = {
    children:any,
    defaultParams?:any,
    setParams:Dispatch<SetStateAction<any>>
}

function StateProvider ({ children, defaultParams, setParams }:Props) {
    function setCurrentState ( state:any ):void {
        const newParams:any = {}

        for (const key in state) {
            if (defaultParams.hasOwnProperty(key)) newParams[key] = state[key]
        } setParams(newParams)
    }

    function setStateToDefault () {
        setParams(defaultParams)
    }

    function saveState () {
        return
    }

    function previousState() {
        return
    }

    function nextState () {
        return
    }

    return (
        <StateContext.Provider value={{ setCurrentState, setStateToDefault }}>
            { children }
        </StateContext.Provider>
    )
}

export default StateProvider