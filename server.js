import express from 'express';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';

import {
  schema as schemaNormal,
} from './schema/count';
import {
  schema as schemaShort,
  root,
  basicSchema,
} from './schema/user';
import {
  StarWarsSchema,
} from './schema/starWarsSchema';

const app = express();

const schema = StarWarsSchema;
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

