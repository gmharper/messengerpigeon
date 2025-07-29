
// IMPORTS

// COMPONENTS


// TYPE DECLARATION
type AppProps = {
    cardShape: string,
    article: article
}

type article = {
    type: string,
    article_id: number,
    title: string,
    topic: string,
    author: string,
    created_at: Date,
    votes: number,
    article_img_url: string,
    comment_count: number
} | null

function ArticleCard ({ cardShape, article }:AppProps ):React.JSX.Element {
    return (
        <>
            { article ? cardShape==='row' ?
                <div className='flex flex-row w-full h-16 bg-stone-100 rounded-xl'>
                    <p className='font-bold text-black'>
                    { article.title }
                    </p>
                </div>
                : cardShape==='square' ?
                <div className='grid grid-cols-4'>
                </div> 
                : <></> : <></>
            }
        </>
    )
}

export default ArticleCard