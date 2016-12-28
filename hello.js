var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello(id: ID!): String
  }
`);

var root = { hello: (rootValue) => `Hello ${rootValue}!` };

graphql(schema, '{ hello(id: 4) }', root).then((response) => {
  console.log(response);
});
