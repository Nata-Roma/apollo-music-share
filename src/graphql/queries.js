import { gql } from '@apollo/client';

export const GET_QUEUES_SONGS = gql`
    query getQueuedSong {
      queue @client {
        url
        title
        thumbnail
        id
        duration
        artist
      }
    }
`;
