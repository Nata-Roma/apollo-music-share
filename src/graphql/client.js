import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://appolo-music-share.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

export default client;