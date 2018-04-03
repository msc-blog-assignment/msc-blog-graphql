const {readFileSync} = require('fs');
const {makeExecutableSchema} = require('graphql-tools');
const request = require('superagent');

// GraphQL Type Definitions
const typeDefs = readFileSync(__dirname + '/types.graphql', 'utf8').toString();

const resolvers = {
    Query: {
        article: (obj, args, context) => request
            .get(`https://msc-blog-article-api.cfapps.io/api/articles/${args.id}`)
            .then(res => res.body),
        articles: (obj, args, context) => request
            .get(`https://msc-blog-article-api.cfapps.io/api/articles?${args.filter}`)
            .then(res => res.body)
    },
};

// Schema used to bootstrap server
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});