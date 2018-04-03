const {readFileSync} = require('fs');
const {makeExecutableSchema} = require('graphql-tools');
const {getUser, getUsers} = require('./remote/user');
const {getArticle, getArticles} = require('./remote/article');

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
        articles: (user) => getArticles({where: {userId: user.id}})
    },
    Article: {
        user: (article, args) => getUser(args.auth, article.userId)
    }
};

// Schema used to bootstrap server
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});