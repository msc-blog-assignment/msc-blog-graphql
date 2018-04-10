const {readFileSync} = require('fs');
const {makeExecutableSchema} = require('graphql-tools');
const {login, getUser, getUsers} = require('./remote/user');
const {getArticle, getArticles, createArticle} = require('./remote/article');
const {getComments} = require('./remote/comments');

// GraphQL Type Definitions
const typeDefs = readFileSync(__dirname + '/types.graphql', 'utf8').toString();

const resolvers = {
    Query: {
        // User
        user: (obj, args, auth) => getUser(auth, args.id),
        users: (obj, args, auth) => getUsers(auth),

        // Articles
        article: (obj, args) => getArticle(args.id),
        articles: (obj, args) => getArticles(args.filter),
        myArticles: (obj, args) => getArticles({where: {userId: args.id}})
    },
    User: {
        articles: (user) => getArticles({where: {userId: user.id}}),
        comments: (user) => getComments({where: {userId: user.id}})
    },
    Article: {
        user: (article, args, auth) => getUser(auth, article.userId),
        comments: (article) => getComments({where: {articleId: article.id}})
    },
    Response: {
        article: (response) => getArticle(response.articleId),
        user: (response, args, auth) => getUser(auth, response.userId)
    },

    // Mutations
    Mutation: {
        login: (_, {username, password}) => login(username, password),
        createArticle: (_, {userId, name, content}) => createArticle(userId, name, content)
    }
};

// Schema used to bootstrap server
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});