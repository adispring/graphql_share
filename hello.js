var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello(str: String): Shop
  }
  type Shop {
    str: String
    name: String
  }
`);

var root = { hello: (rootValue) => {
  console.log(rootValue.str);
  return ({str: rootValue.str, name: 'wangzengdi'});
}};

graphql(schema, '{ hello(str: "haha"){str,name} }', root).then((response) => {
  console.log(response);
});
