import express from 'express';
import { graphql, buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

const app = express();
const PORT = 3000;

const schema = buildSchema(`
  type Query {
    hello(str: String): String 
  }
`);

export const root = {
  hello: rootValue => Promise.resolve(`hello, ${rootValue.str}`),
  // hello: rootValue => `hello, ${rootValue.str}`,
  // hello: rootValue => Promise.reject(`hello, ${rootValue.str}`),
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

