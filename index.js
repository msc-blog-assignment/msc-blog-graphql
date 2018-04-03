const {graphiqlExpress, graphqlExpress} = require('apollo-server-express/dist');
const bodyParser = require('body-parser');
const express = require('express');

const port = 3030;
const app = express();
const endpointURL = '/graphql';

const schema = require('./lib/schema');

app.use(endpointURL, bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL}));

app.listen(port, () =>
    console.log(`Started on http://localhost:${port}/graphiql`)
);