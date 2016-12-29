import express from 'express';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

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
const PORT = 3000;

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  console.log('**********req.body', req.body);
  const schema = StarWarsSchema;
//  graphql(schemaNormal, req.body)
//  .then((result) => {
//    res.send(JSON.stringify(result, null, 2));
//  });
//  graphql(schemaShort, req.body, root).then((response) => {
//    res.send(JSON.stringify(response, null, 2));
//  });
  graphql(schema, req.body).then((response) => {
    console.log(response);
    res.send(JSON.stringify(response, null, 2));
  });
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});

