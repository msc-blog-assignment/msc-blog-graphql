const {readFileSync} = require('fs');
const {makeExecutableSchema} = require('graphql-tools');
const {getUser, getUsers} = require('./remote/user');
const {getArticle, getArticles} = require('./remote/article');
const {getComments, getComment, getResponses} = require('./remote/comments');

// GraphQL Type Definitions
const typeDefs = readFileSync(__dirname + '/types.graphql', 'utf8').toString();

const resolvers = {
    Query: {
        // User
        user: (obj, args) => getUser(args.auth, args.id),
        users: (obj, args) => getUsers(args.auth),

        // Articles
        article: (obj, args) => getArticle(args.id),
        articles: (obj, args) => getArticles(args.filter)
    },
    User: {
        articles: (user) => getArticles({where: {userId: user.id}}),
        comments: (user) => getComments({where: {userId: user.id}})
    },
    Article: {
        user: (article, args) => getUser(args.auth, article.userId),
        comments: (article) => getComments({where: {articleId: article.id}})
    },
    Response: {
        article: (response) => getArticle(response.articleId),
        user: (response, args) => getUser(args.auth, response.userId)
    }
};

// Schema used to bootstrap server
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});