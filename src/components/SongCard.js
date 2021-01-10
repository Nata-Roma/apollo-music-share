import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles, CardActions, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, Save } from '@material-ui/icons';
import { SongContext } from '../App';
import { useMutation } from '@apollo/client';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
    },
    thubmnail: {
        width: 140,
        height: 140,
        objectFit: 'cover',
        marginRight: theme.spacing(2),
    }
}));

const SongCard = ( song ) => {
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: (data) => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    });
    const {state, dispatch} = useContext(SongContext);
    const classes = useStyles();
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
    const {title, artist, thumbnail, id} = song;

    useEffect(() => {
        const isSongPlaying = state.isPlaying && id === state.song.id;
        setCurrentSongPlaying(isSongPlaying);
    }, [id, state.song.id, state.isPlaying]);

    const handleSongCardPlaying = () => {
        dispatch({type: 'ADD_SONG', payload: {song}})
        dispatch(state.isPlaying ? {type: 'PAUSE_SONG'} : {type: 'PLAY_SONG'})
    };

    const handleAddOrRemoveFromQueue = () => {
        addOrRemoveFromQueue({
            variables: {input: {...song, __typename: 'Song'}}
        })
    };

    return (
        <Card className={classes.container}>
            <CardContent className={classes.cardContent}>
                <CardMedia image={thumbnail} className={classes.thubmnail} />
                <div>
                <Typography gutterBottom variant='h5' component='h2'>
                    {title}
                </Typography>
                <Typography variant='body1' component='p' color='textSecondary'>
                    {artist}
                </Typography>
                </div>
                
            </CardContent>
            <CardActions>
                <IconButton size='small' onClick={handleSongCardPlaying}>
                {currentSongPlaying ? <Pause color='primary' /> : <PlayArrow color='primary' /> }
                </IconButton>
                <IconButton size='small' onClick={handleAddOrRemoveFromQueue}>
                    <Save color='secondary' />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default SongCard;