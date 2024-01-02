const promClient = require('prom-client');

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in milliseconds',
  labelNames: ['user','method', 'route', 'code','error'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000]
});
const  graphqlRequestDurationMicroseconds = new promClient.Histogram({
  name: 'graphql_request_duration_ms',
  help: 'Duration of graphql requests in milliseconds',
  labelNames: ['user','method','queryType','quwryOn' ,'code','error'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000]
});

module.exports = {
  httpRequestDurationMicroseconds,
  graphqlRequestDurationMicroseconds
};