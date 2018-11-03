const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const port = 4000;
app.listen(port, () => {console.log('server on '+port)});
