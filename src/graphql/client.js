import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {WebSocketLink} from 'apollo-link-ws';
import { GET_QUEUES_SONGS } from './queries';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://appolo-music-share.hasura.app/v1/graphql',
    options: {
      reconnect: true
    }
  }),
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }
    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }
    type Query {
      queue: [Song]!
    }
    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, {input}, {cache} ) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUES_SONGS
        });
        if(queryResult) {
          const {queue} = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue ? queue.filter((song) => song.id !== input.id) : [...queue, input];
          cache.writeQuery({
            query: GET_QUEUES_SONGS,
            data: {queue: newQueue}
          })
          return newQueue;
        }
        return [];
      }
    }
  }
});

// const data = {
//   queue: []
// };

const hasQueue = Boolean(localStorage.getItem('queue'));

client.writeQuery({
  query: gql`
    query queue {
      queue
    }
  `,
  data: {
    queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
  }
});

// client.writeQuery({data});

export default client;