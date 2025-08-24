// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { getUserByUsername, getArticles, getComments } from "@/app/scripts/fetch/index"

// COMPONENTS
import { GridPanel } from "../Main/index"
import { BoxLabel, LoadingCard } from "../../style/index"
import { ArticleCard } from "../Articles/index"
import { CommentCard } from "../Comments/index"

import { SyncLoader } from "react-spinners"

// TYPE DECLARATIONS
type user = {
    type:string, username: string, name: string, password:string, email:string, verified:boolean, description:string,
    avatar_img_url:string, banner_img_url:string, profile_colour:string,
    banner_blend:string, banner_position:string,
    articles:Array<string>, comments:Array<string>, subscribed_topics:Array<string>, subscribed_games:Array<string>
    followers:Array<string>, following:Array<string>,
    voted_articles:Array<string>, voted_comments:Array<string>,
    created_at:string
}

const defaultUser = {
    type: 'user', username: '', name: '', password: '', email: '', verified: false, description: '',
    avatar_img_url: '', banner_img_url:'', profile_colour:'white',
    banner_blend:'normal', banner_position:'center',
    articles:[], comments:[], subscribed_topics:[], subscribed_games:[],
    followers:[], following:[],
    voted_articles:[], voted_comments:[],
    created_at:''
}

type UserProps = {
    username:string,
    setHeading?: Dispatch<SetStateAction<string>>
}

function UserPage ():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    const userReducer = (state:any, action:any) => {
        const userCopy = {...state}

        for (const key in action) {
            if (userCopy.hasOwnProperty(key)) userCopy[key] = action[key]
        } return userCopy
    }

    const [storedUser, setStoredUser] = useReducer(userReducer, defaultUser)

    const [userArticles, setUserArticles] = useState([])
    const [userComments, setUserComments] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [articlesLoading, setArticlesLoading] = useState(false)
    const [articlesError, setArticlesError] = useState(null)

    const [commentsLoading, setCommentsLoading] = useState(false)
    const [commentsError, setCommentsError] = useState(null)

    useEffect(() => {
        setParams({ location: 'user_page', heading: 'USER' })

        if (params.loading_page) {
            getUserByUsername(params.id, setStoredUser, setLoading, setError)
            .then((user) => {
                setParams({ location: 'user_page', heading: user.name})
                getArticles(setUserArticles, setArticlesLoading, setArticlesError, '', user.username, 'created_at', 'DESC', 0, 8)
                return user
            })
            .then((user) => {
                return getComments(setUserComments, setCommentsLoading, setCommentsError, 0, user.username)
            })
            .then((comments) => {
                console.log(comments)
            })
            .finally(() => {
                setParams({ loading_page: false })
            })
        }
    }, [])

    return (
        <>
        {
            error ? 
            <LoadingCard type={'error'} display_type="User" err_msg={error? error : ''} />
            : 
            loading ? 
            <LoadingCard type={'loading'} display_type="User" />
            :
            <div className='flex flex-col gap-4 w-full px-8 py-12'>
                <BoxLabel text={`${storedUser? storedUser.name : "user" }'s articles`}/>
                <div className='flex w-full justify-center py-2'>
                    {
                        articlesError?
                        <LoadingCard type={'error'} display_type="Articles" err_msg={articlesError? articlesError : ''} />
                        :
                        articlesLoading?
                        <LoadingCard type={'loading'} display_type="Articles" />
                        :
                        (userArticles.length===0)?
                        <LoadingCard type={'empty'} message={"This user has not created any articles!"} />
                        :
                        <GridPanel 
                            cardShape={"row"}
                            isLoading={articlesLoading}
                            error={articlesError}
                            children={
                                userArticles.map((article:any) => {
                                    return (
                                        <ArticleCard article_id={article.article_id} article={article} cardShape={"row"}/>
                                    )
                                })
                            }
                        />
                    }
                </div>

                <BoxLabel text={`${storedUser? storedUser.name : "user" }'s comments`}/>
                <div className='flex w-full justify-center py-2'>
                {
                    commentsError?
                    <LoadingCard type={'error'} display_type="Comments" err_msg={commentsError? commentsError : ''} />
                    :
                    commentsLoading?
                    <LoadingCard type={'loading'} display_type="Comments" />
                    :
                    (userComments.length===0)?
                    <LoadingCard type={'empty'} message={"This user has not posted any comments!"} />
                    :
                    <GridPanel 
                        cardShape={"row"}
                        isLoading={commentsLoading}
                        error={commentsError}
                        children={
                            userComments.map((comment:any) => {
                                return (
                                    <CommentCard comment_id={comment.comment_id} comment={comment} cardShape={"row"}/>
                                )
                            })
                        }
                    />
                }
                </div>
            </div>
        }
        </>
    )
}

export default UserPage