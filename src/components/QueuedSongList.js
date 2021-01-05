import { Typography } from '@material-ui/core';
import React from 'react';
import FavSongCard from './FavSongCard';

const song = {
    title: 'Song',
    artist: 'singer',
    thumbnail: 'https://i1.sndcdn.com/artworks-000107899443-qxcwl0-t500x500.jpg'
};

const QueuedSongList = () => {
    return (
    <div style={{margin: '10px 0'}}>
    <Typography color='textSecondary' variant='button' >
        QUEUE (5)
    </Typography>
    
    {Array.from({length: 5}, () => song).map((song, i) => <FavSongCard key={i} {...song} />)}
    </div>
)};

export default QueuedSongList;
