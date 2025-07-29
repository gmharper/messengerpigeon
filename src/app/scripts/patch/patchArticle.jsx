
import { getArticleById } from "../fetch/index"

function patchArticle ({ type, username, articleId, comment, setLoading, setError }) {


    const articleToPatch = getArticleById(articleId)
    const user = {}
    const article = {}
    switch (type) {
        case 'post_comment':
            break;
        case 'delete_comment':
            break;
        case 'like':
            break;
        case 'unlike':
            break;
    }
    // get article by id
    // post comment to article

    // get comments
    // post to comments

    // get user
    // post comment to users comments
}