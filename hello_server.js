import express from 'express';
import {
  graphql,
  buildSchema,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  } from 'graphql';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      args: {
        str: { type: GraphQLString },
      },
      resolve: (rootValue, { str }) => `hello, ${str}`,
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql(schema, req.body).then((response) => {
    res.send(JSON.stringify(response, null, 2));
  });
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});

// const schema = buildSchema(`
//   type Query {
//     hello(str: String): String
//   }
// `);
//
// export const root = {
//   hello: rootValue => `hello, ${rootValue.str}`,
// };

