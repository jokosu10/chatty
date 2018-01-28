import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { Schema } from './data/schema';
import { Mocks } from './data/mocks';
import { graphiqlConnect } from 'apollo-server-express/dist/connectApollo';

const PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
});

addMockFunctionsToSchema({
    schema: executableSchema,
    mocks: Mocks,
    preserveResolvers: true,
});

// set endpoint URL
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: executableSchema,
    context: {}, //set empty object
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));

const graphQLServer = createServer(app);

app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));