import { Dispatch, SetStateAction } from "react";

function handleThemeChange ( 
    type:string, 
    setTheme: Dispatch<SetStateAction<any>>,
    setLoggedInUser: Dispatch<SetStateAction<any>> 
) {
    switch (type) {
        case 'dark':
            setTheme({
                theme: 'dark', 
                base: ' bg-zinc-900 ',
                secondary: ' bg-zinc-800 ',
                alt: ' bg-white ',
                lines: ' lines-background-dark ',
                panel: ' bg-zinc-900 lines-background-dark outline-zinc-800 ',
                text: ' text-white ',
                text_alt: ' text-black '
            })
            setLoggedInUser({ 
                theme: 'dark', 
            })
            break;
        case 'light':
            setTheme({ 
                theme: 'light',
                base: ' bg-zinc-200 ',
                secondary: ' bg-white ',
                alt: ' bg-zinc-900 ', 
                lines: ' lines-background-light ',
                panel: 'bg-zinc-100 lines-background-light outline-zinc-300 ',
                text: ' text-black ',
                text_alt: ' text-white '
            })
            setLoggedInUser({ 
                theme: 'light',
            })
            break;
        default:
            return
    }
}

export default handleThemeChange
