import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://testing.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});

export default client;
