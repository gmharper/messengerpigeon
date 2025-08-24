
import getUsers from "./users/fetchUsers"
import getUserByUsername from "./users/fetchUserByUsername"
import getUserData from "./users/fetchUserData"
import getUsersData from "./users/fetchUsersData"

import getArticles from "./articles/fetchArticles"
import getArticleById from "./articles/fetchArticleById"
import getArticleData from "./articles/fetchArticleData"
import getArticlesData from "./articles/fetchArticlesData"

import getComments from "./comments/fetchComments"
import getCommentById from "./comments/fetchCommentById"
import getCommentData from "./comments/fetchCommentData"
import getCommentsData from "./comments/fetchCommentsData"

import getTopics from "./topics/fetchTopics"
import getTopicBySlug from "./topics/fetchTopicBySlug"
import getTopicData from "./topics/fetchTopicData"
import getTopicsData from "./topics/fetchTopicsData"

export { 
    getUsers, getUserByUsername, getUserData, getUsersData,
    getArticles, getArticleById, getArticleData, getArticlesData,
    getComments, getCommentById, getCommentData, getCommentsData,
    getTopics, getTopicBySlug, getTopicData, getTopicsData
}