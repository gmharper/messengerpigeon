// IMPORTS
import { useContext, useEffect, useState } from 'react'
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { getUsersData } from '@/app/scripts/fetch/index'
import { postUser } from '@/app/scripts/post/index'

function SignupPage () {
    const { setLoggedInUser } = useContext(AppContext)
    
    const [usernames, setUsernames] = useState([])
    const [usernamesLoading, setUsernamesLoading] = useState(false)
    const [usernamesError, setUsernamesError] = useState(null)

    const [usernameInput, setUsernameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [repasswordInput, setRepasswordInput] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const [signupLoading, setSignupLoading] = useState(false)
    const [signupError, setSignupError] = useState(null)


    async function isValidUsernameAndEmail () {
        if (usernameInput==="") {
            setUsernameError("No username provided")
            setErrorMessage("One or more entry fields are empty!")
            return false
        }

        if (usernameInput.length < 8) {
            setUsernameError("Username must be at least 8 characters long")
            return false
        }
        if (usernameInput.length > 30) {
            setUsernameError("Username must be no longer than 40 characters")
            return false
        }

        if (emailInput==="") {
            setEmailError("No email provided")
            setErrorMessage("One or more entry fields are empty!")
            return false
        }

        return getUsersData("/data/email", setUsernames, setUsernamesLoading, setUsernamesError)
        .then((usernames:any) => {
            if (!usernames) return false

            const usernamesArray = usernames.map((user:any) => {
                return user.username
            })

            const emailsArray = usernames.map((user:any) => {
                return user.email
            })

            if (usernamesArray.includes(usernameInput)) {
                setErrorMessage("There is already an account with that username!")
                return false
            }
            if (emailsArray.includes(emailInput)) {
                setErrorMessage("There is already an account with that email!")
                return false
            }
            return true
        })
        .catch((err) => {
            setErrorMessage(err)
            return console.log(err)
        })
    }

    function isValidPassword () {
        if (passwordInput==="") {
            setPasswordError("No password provided")
            setErrorMessage("One or more entry fields are empty!")
            return false
        }
        if (passwordInput.length < 8) {
            setErrorMessage("Password must be at least 8 characters long!")
            return false
        }
        if (passwordInput.length > 40) {
            setErrorMessage("Password must be no longer than 40 characters long!")
            return false
        }
        if (repasswordInput !== passwordInput) {
            setErrorMessage("Passwords do not match!")
            return false
        }
        return true
    }

    function handleSignup (e:any) {
        e.preventDefault()
        if (!isValidUsernameAndEmail()) return
        if (!isValidPassword()) return

        const newUser = {
            username: usernameInput, name: usernameInput, email: emailInput, password: passwordInput,
            created_at: Date.now()
        }

        postUser(newUser, setLoggedInUser, setSignupLoading, setSignupError)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            return setErrorMessage(err)
        })
    }

    return (
        <div className='flex flex-col gap-2 bg-zinc-800/70 w-120 h-150 rounded-xl items-center content-center justify-center px-4 py-4 shadow-lg shadow-black'>
        { signupError ? 
            <div className='flex flex-col w-full h-full gap-4 items-center content-center outline-1 outline-zinc-600 px-16 py-4'>
                <div className='w-full h-16 bg-zinc-900 rounded-xl'>
                    <p className='text-gray-100'>Something went wrong! Please try again</p>
                </div>
                
                <button 
                    className='w-full h-10 bg-indigo-500 rounded-xl'
                    onClick={() => {setSignupError(null)}}>
                    <p className='text-black'>Try Again</p>
                </button>

                <div className='w-full h-16 bg-zinc-900 rounded-xl'>
                    <p className='text-gray-500'>{signupError && signupError.err_msg}</p>
                </div>
            </div> 
            :
        signupLoading ? 
            <div className='flex flex-col w-full h-full gap-4 items-center content-center justify-center outline-1 outline-zinc-600 px-16 py-4'>
                <div className='w-full h-16 bg-white rounded-xl items-center content-center'>
                    <p className='text-black'>Processing Request...</p>
                </div>
            </div> 
            :

            <form className='flex flex-col w-full h-full gap-4 items-center content-center outline-1 outline-zinc-600 px-16 py-4'
            onSubmit={(e) => {handleSignup(e)}}>
                <div>
                    <p className='font-bold text-black text-xl bg-white rounded-sm px-16 py-2'>Signup</p>
                </div>

                <div>
                    <p className='text-gray-400 text-sm'>
                        By creating an account, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
                    </p>
                </div>

                <div className='w-full h-[1px] bg-zinc-500 rounded-full'/>

                <input
                    className={'w-full h-8 bg-white rounded-full text-black text-sm px-2 overflow-hidden' +(usernameError && " outline-1 outline-red-500")}
                    onFocus={() => {setUsernameError("")}}
                    onBlur={() => {setUsernameError("")}}
                    onChange={(e) => { setUsernameInput(e.target.value) }}
                    type="text"
                    placeholder={"Enter your username"} 
                />
                
                <input
                    className={'w-full h-8 bg-white rounded-full text-black text-sm px-2 overflow-hidden' +(emailError && " outline-1 outline-red-500")}
                    onFocus={() => {setEmailError("")}}
                    onBlur={() => {setEmailError("")}}
                    onChange={(e) => { setEmailInput(e.target.value) }}
                    type="email"
                    placeholder={"Enter your email"} 
                />

                <input 
                    className={'w-full h-8 bg-white rounded-full text-black text-sm px-2' +(passwordError && ' outline-1 outline-red-500')}
                    onFocus={() => {setPasswordError("")}}
                    onBlur={() => {setPasswordError("")}}
                    onChange={(e) => { setPasswordInput(e.target.value) }}
                    type="password"
                    placeholder={"Enter your password"}
                />

                <input 
                    className={'w-full h-8 bg-white rounded-full text-black text-sm px-2' +(passwordError && ' outline-1 outline-red-500')}
                    onFocus={() => {setPasswordError("")}}
                    onBlur={() => {setPasswordError("")}}
                    onChange={(e) => { setRepasswordInput(e.target.value) }}
                    type="password"
                    placeholder={"Re-enter your password"}
                />

                <button type="submit" className='w-full h-10 bg-sky-500 rounded-2xl'>SUBMIT</button>

                { errorMessage ? 
                    <div className='w-full h-6 my-2 content-center bg-yellow-300 rounded-sm'>
                        <p className='font-bold text-black text-xs text-center'>{errorMessage}</p>
                    </div> : <div className='h-6 my-2'></div>
                }
            </form> 
        }
        </div> 
    )
}

export default SignupPage