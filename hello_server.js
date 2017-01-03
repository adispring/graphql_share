import express from 'express';
import { graphql, buildSchema } from 'graphql';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

const schema = buildSchema(`
  type Query {
    hello(str: String): String 
  }
`);

export const root = {
  hello: rootValue => `hello, ${rootValue.str}`,
};

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql(schema, req.body, root).then((response) => {
    res.send(JSON.stringify(response, null, 2));
  });
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});

