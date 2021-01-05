import { CircularProgress } from '@material-ui/core';
import React from 'react';
import SongCard from './SongCard';

const song = {
    title: 'SONG',
    artist: 'singer', 
    thumbnail: 'https://i1.sndcdn.com/artworks-000107899443-qxcwl0-t500x500.jpg'
}

const SongList = () => {
    const loading = false;

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
    return <div>
    {Array.from({length: 10}, () => song).map( (song, i) => <SongCard key={i} {...song} /> )}
        
    </div>
};

export default SongList;
