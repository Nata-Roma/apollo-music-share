import { Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import FavSongCard from './FavSongCard';


// const song = {
//     title: 'Song',
//     artist: 'singer',
//     thumbnail: 'https://i1.sndcdn.com/artworks-000107899443-qxcwl0-t500x500.jpg'
// };

const QueuedSongList = ({queue}) => {
    
    // console.log(queue)
    const greaterThan = useMediaQuery((theme) => theme.breakpoints.up('md'));
    return greaterThan && (
    <div style={{margin: '10px 0'}}>
    <Typography color='textSecondary' variant='button' >
        QUEUE ({queue.length})
    </Typography>
    
    {queue.map((song) => <FavSongCard key={song.id} {...song} />)}
    </div>
)};

export default QueuedSongList;
