// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// TYPE DECLARATIONS
type SettingsProps = {
    setHeading: Dispatch<SetStateAction<string>>
}

function Settings ({ setHeading }:SettingsProps):React.JSX.Element {
    const { loggedInUser } = useContext(AppContext)

    useEffect(() => {
        setHeading('SETTINGS')
    }, [])

    return (
        <div>

        </div>
    )
}

export default Settings