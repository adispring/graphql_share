/* eslint import/prefer-default-export: 0 */
/* eslint max-len: 0 */
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  buildSchema,
} from 'graphql';

let count = 0;

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        description: 'The count!',
        resolve: () => count,
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Updates the count',
        resolve: () => {
          count += 1;
          return count;
        },
      },
    },
  }),
});

/*
1. query

curl -XPOST -H "Content-Type:application/graphql"  -d 'query RootQueryType { count }' http://localhost:3000/graphql

curl -XPOST -H "Content-Type:application/graphql"  -d '{ count }' http://localhost:3000/graphql

2. introspection

curl -XPOST -H 'Content-Type:application/graphql'  -d '{__schema { queryType { name, fields { name, description} }}}' http://localhost:3000/graphql

3. mutation

curl -XPOST -H 'Content-Type:application/graphql' -d 'mutation RootMutationType { updateCount }' http://localhost:3000/graphql

curl -XPOST -H 'Content-Type:application/graphql' -d '{ updateCount }' http://localhost:3000/graphql
*/
