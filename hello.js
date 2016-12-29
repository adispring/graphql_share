import { graphql, buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello(str: String): Shop
  }
  type Shop {
    str: String
    name: String
  }
`);

export const root = {
  hello: (rootValue) => {
    console.log(rootValue);
    return ({ str: rootValue.str, name: 'wangzengdi' });
  },
};

// graphql(schema, '{ hello(str: "haha"){name} }', root).then((response) => {
//   console.log(response);
// });

/*
1. query

curl -XPOST -H "Content-Type:application/graphql"  -d '{ hello(str: "haha") {str, name} }' http://localhost:3000/graphql

2. introspection

curl -XPOST -H 'Content-Type:application/graphql'  -d '{__schema { queryType { name, fields { name, description} }}}' http://localhost:3000/graphql

3. mutation

*/
