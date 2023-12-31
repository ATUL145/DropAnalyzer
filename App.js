import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import AppNavigation from "./navigation/AppNavigation";

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

function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  );
}

export default App;
