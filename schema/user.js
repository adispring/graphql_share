import {
  graphql,
  buildSchema,

  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

// Maps id to User object
const fakeDatabase = {
  a: {
    id: 'a',
    name: 'alice',
  },
  b: {
    id: 'b',
    name: 'bob',
  },
};

export const schema = buildSchema(`
  type Query {
    user(id: String): User 
  }
  type User {
    id: String
    name: String
  }
`);

export const root = {
  user: (rootValue) => {
    console.log(rootValue);
    return fakeDatabase[rootValue.id];
  },
};

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (rootValue, { id }) => fakeDatabase[id],
    },
  },
});

export const basicSchema = new GraphQLSchema({ query: queryType });

// graphql(schema, '{ user(id: "a"){name} }', root).then((response) => {
//   console.log(response);
// });

/*
1. query

curl -XPOST -H "Content-Type:application/graphql"  -d '{ user(id: "a") {id, name} }' http://localhost:3000/graphql

2. introspection

curl -XPOST -H 'Content-Type:application/graphql'  -d '{__schema { queryType { name, fields { name, description} }}}' http://localhost:3000/graphql

3. mutation

*/
