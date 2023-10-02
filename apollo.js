import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://grateful-marmot-17.hasura.app/v1/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      "YpWaGDfx6WkO2Ihyw1RZUaytBYiIuVj407yMXoKrrKOWygN75iY6dQ1BeZfCek6T",
    "content-type": "application/json",
  },
});

export default client;
