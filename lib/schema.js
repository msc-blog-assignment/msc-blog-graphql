const {readFileSync} = require('fs');
const {makeExecutableSchema} = require('graphql-tools');
const request = require('superagent');
const endpoints = require('./endpoints');

// GraphQL Type Definitions
const typeDefs = readFileSync(__dirname + '/types.graphql', 'utf8').toString();

const resolvers = {
    Query: {
        // User

        // Articles
        article: (obj, args) => request
            .get(`${endpoints.articlesApi}/api/articles/${args.id}`)
            .then(res => res.body),
        articles: (obj, args) => request
            .get(`${endpoints.articlesApi}/api/articles?${args.filter}`)
            .then(res => res.body)
    },
};

// Schema used to bootstrap server
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});