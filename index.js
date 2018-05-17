const {graphiqlExpress, graphqlExpress} = require('apollo-server-express/dist');
const bodyParser = require('body-parser');
const express = require('express');
const {apolloUploadExpress} = require('apollo-upload-server');

const port = process.env.PORT || 3030;
const app = express();
const endpointURL = '/graphql';

const schema = require('./lib/schema');

app.use(endpointURL,
    bodyParser.json(),
    apolloUploadExpress(/* Options */),
    graphqlExpress(request => ({
        schema,
        context: request.headers.authorization
    }))
);
app.use('/graphiql', graphiqlExpress({endpointURL}));

app.listen(port, () =>
    console.log(`Started on http://localhost:${port}/graphiql`)
);