import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { GET_SONG } from '../graphql/query';
import SongCard from './SongCard';

const SongList = () => {
    const {data, loading, error} = useQuery(GET_SONG);

    if(loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 50,
                alignItems: 'center',
            }}>
                <CircularProgress />
            </div>
        )
    }
    if(error) return <div>Error fetching song</div>
    return <div>
    {data.songs.map( (song) => <SongCard key={song.id} {...song} /> )}
        
    </div>
};

export default SongList;
