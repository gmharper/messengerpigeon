// IMPORTS
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state"

// SCRIPTS
import { getUserByUsername, getUsersData } from "@/app/scripts/fetch/index"

// STYLING
let icon_button = 'w-20 h-20 bg-white rounded-xl'

type Props = {
    setDisplayType: Dispatch<SetStateAction<string>>
}

function LoginPage ():React.JSX.Element {
    const { isLoggedIn, setIsLoggedIn, setLoggedInUser } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)

    const [usernames, setUsernames] = useState([])
    const [usernamesLoading, setUsernamesLoading] = useState(false)
    const [usernamesError, setUsernamesError] = useState(false)

    const [nameInput, setNameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)

    function openSignupPage () {
        const signupState = {
            display_type: 'signup',
            disable_roost: true,
            show_function_bar: false
        }
        setCurrentState(signupState)
    }

    function handleLogin (e:any) {
        e.preventDefault()
        if (nameInput==="" && passwordInput==="") {
            setNameError("No username or email entered")
            setPasswordError("No password entered")
            setErrorMessage("One or more entry fields are empty!")
            return
        }
        else if (nameInput==="") {
            setNameError("No username or email entered")
            setErrorMessage("One or more entry fields are empty!")
            return
        }
        else if (passwordInput==="") {
            setPasswordError("No password entered")
            setErrorMessage("One or more entry fields are empty!")
            return
        }

        getUsersData("data/email", setUsernames, setUsernamesLoading, setUsernamesError)
            .then((usernames:any) => {
                console.log(usernames)
                const userToLogin = usernames.map((user:any) => {
                    if (user) {
                        if ((user.username && user.username.includes(nameInput)) || user.email.includes(nameInput)) {
                            console.log(user.username)
                            return user.username
                        }
                    }
                })
                return userToLogin
            })
            .then((userToLogin) => {
                getUserByUsername(userToLogin, setLoggedInUser, setLoginLoading, setLoginError)
                return setIsLoggedIn(true)
            })
            .catch((err) => {
                console.log(err)
                return setErrorMessage(err)
            })
            .finally(() => {
                setLoginLoading(false)
                setUsernamesLoading(false)
            })
    }

    return (
        <div className='flex flex-col gap-2 bg-zinc-800/70 w-120 h-150 rounded-xl items-center content-center justify-center px-4 py-4 shadow-lg shadow-black'>
            <form className='flex flex-col w-full h-full gap-4 items-center content-center px-16 py-4 outline-1 outline-zinc-600' 
            onSubmit={(e) => {handleLogin(e)}}>
                <div>
                    <p className='font-bold text-black text-xl bg-white rounded-sm px-16 py-2'>Login</p>
                </div>

                <div>
                    <p className='text-gray-400 text-sm'>
                        By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
                    </p>
                </div>

                <div className='flex flex-row gap-1'>
                    <div className={icon_button}>

                    </div>

                    <div className={icon_button}>

                    </div>

                    <div className={icon_button}>

                    </div>

                    <div className={icon_button}>

                    </div>
                </div>

                <div className='w-full h-[1px] bg-zinc-500 rounded-full'/>
                
                <input
                    className={'w-full h-8 bg-white rounded-full text-black text-sm px-2 overflow-hidden' +(nameError && " outline-1 outline-red-500")}
                    onFocus={() => {setNameError("")}}
                    onBlur={() => {setNameError("")}}
                    onChange={(e) => { setNameInput(e.target.value) }}
                    placeholder={"Enter your username or email"} 
                />

                <input 
                    className={'w-full h-8 bg-white rounded-full text-black text-sm px-2' +(passwordError&& ' outline-1 outline-red-500')}
                    onChange={(e) => { setPasswordInput(e.target.value) }}
                    placeholder={"Enter your password"}
                    type="password"
                />

                <button type="submit" className='w-full h-10 bg-sky-500 rounded-2xl'>SUBMIT</button>

            { errorMessage ? 
                <div className='w-full h-6 my-2 content-center bg-yellow-300 rounded-sm'>
                {
                    loginError ? <p className='font-bold text-black text-xs text-center'>{errorMessage}</p> :
                    usernamesError ? <p className='font-bold text-black text-xs text-center'>{errorMessage}</p> :
                    nameError ? <p className='font-bold text-black text-xs text-center'>{errorMessage}</p> :
                    passwordError ? <p className='font-bold text-black text-xs text-center'>{errorMessage}</p> :
                    <></>
                }
                </div> : <div className='h-6 my-2'></div>
            }
            </form>


            <div className='flex flex-row gap-1'>
                <p className='text-white'>Don't have an account?</p>
                <button onClick={() => { openSignupPage() }}>
                    <p className='text-indigo-500'>Sign Up</p>
                </button>
            </div>
        </div> 
    )
}

export default LoginPage