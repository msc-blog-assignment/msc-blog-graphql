const {readFileSync} = require('fs');

const {makeExecutableSchema} = require('graphql-tools');
const {signup, login, logout, me, getUser, getUsers} = require('./remote/user');
const {getArticle, getArticles, createArticle, getArticleCount} = require('./remote/article');
const {getComments, addComment, respondToComment, getResponses} = require('./remote/comments');
const {getAvatar, uploadAvatar} = require('./remote/avatar');

// GraphQL Type Definitions
const typeDefs = readFileSync(__dirname + '/types.graphql', 'utf8').toString();

const resolvers = {
    Query: {
        // Me
        me: (obj, args, {auth}) => me(auth),

        // User
        user: (obj, args, {auth}) => getUser(auth, args.id),
        users: (obj, args, {auth}) => getUsers(auth),

        // Articles
        article: (obj, args) => getArticle(args.id),
        articles: (obj, args) => getArticles(args.filter),
        myArticles: (obj, args) => getArticles({where: {userId: args.id}})
    },
    Me: {
        articles: (user) => getArticles({where: {userId: user.id}}),
        comments: (user) => getComments({where: {userId: user.id}}),
        totalArticles: (user) => getArticleCount({userId: user.id}),
        avatar: (user) => getAvatar(user.id)
    },
    User: {
        articles: (user) => getArticles({where: {userId: user.id}}),
        comments: (user) => getComments({where: {userId: user.id}}),
        totalArticles: (user) => getArticleCount({userId: user.id}),
        avatar: (user) => getAvatar(user.id)
    },
    Article: {
        user: (article, args, {auth}) => getUser(auth, article.userId),
        comments: (article) => getComments({where: {articleId: article.id}})
    },
    Response: {
        article: (response) => getArticle(response.articleId),
        user: (response, args, {auth}) => getUser(auth, response.userId)
    },
    Comment: {
        responses: (comment) => getResponses({where: {commentId: comment.id}}),
        user: (comment, args, {auth}) => getUser(auth, comment.userId)
    },
    Login: {
        me: (user) => me(user.id),
        totalArticles: (user) => getArticleCount({userId: user.id}),
        avatar: (user) => getAvatar(user.id)
    },

    // Mutations
    Mutation: {
        signup: (_, {username, email, password}) => signup(username, email, password),

        login: (_, {username, password}) => login(username, password),

        logout: (_, __, {auth}) => logout(auth),

        // Articles
        createArticle: (_, {userId, name, content}) => createArticle(userId, name, content),

        // Comments
        comment: (_, {userId, articleId, comment}) => addComment(userId, articleId, comment),

        respondToComment: (_, {userId, articleId, commentId, response}) => respondToComment(userId, articleId, commentId, response),

        // Avatar
        uploadAvatar: (_, {userId, file, size}) => uploadAvatar(userId, file, size)
    }
};

// Schema used to bootstrap server
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});