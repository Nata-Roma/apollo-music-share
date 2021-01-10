import { useQuery } from '@apollo/client';
import { Card, Typography, CardContent, IconButton, makeStyles, Slider, CardMedia } from '@material-ui/core';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { SongContext } from '../App';
import { GET_QUEUES_SONGS } from '../graphql/queries';
import QueuedSongList from './QueuedSongList';

// const song = {
//     title: 'Sweet Home Alabama',
//     artist: 'Lynyrd Skynyrd',
//     thumbnail: 'https://i.ytimg.com/vi/IwWUOmk7wO0/hqdefault.jpg'
// };

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15px'
    },
    content: {
        flex: '1 0 auto',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    playIcon: {
        width: '40px',
        height: '40px',
    },
    thumbnail: {
        width: 150,
        height: 150,
    }

}));


const SongPlayer = () => {
    const {data} = useQuery(GET_QUEUES_SONGS);
    const {state, dispatch} = useContext(SongContext);
    const classes = useStyles();
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [positionInQueue, setPositionInQueue] = useState(0);
    const reactPlayerRef = useRef();

    useEffect(() => {
        const songIndex = data.queue.findIndex((song) => song.id === state.song.id);
        setPositionInQueue(songIndex);
    }, [data.queue, state.song.id]);

    useEffect(() => {
        const nextSong = data.queue[positionInQueue + 1];
        if(played === 1 && nextSong) {
            setPlayed(0);
            dispatch({type: 'SET_SONG', payload: {song: nextSong}});
        }
    }, [played, data.queue, positionInQueue, dispatch]);

    const handleTogglePlay = () => {
        dispatch(state.isPlaying ? {type: 'PAUSE_SONG'} : {type: 'PLAY_SONG'});
        
    };

    const handleProgressChange = (e, newValue) => {
        setPlayed(newValue);
    };
    const handleOnMouseDown = () => {
        setSeeking(true);
    };
    const handleOnMouseUp = () => {
        setSeeking(false);
        reactPlayerRef.current.seekTo(played);
    };
    const formatDuration = (seconds) => {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    };
    const handlePrevSong = () => {
        const prevSong = data.queue[positionInQueue - 1];
        if(prevSong) {
            dispatch({type: 'SET_SONG', payload: {song: prevSong}});
        }
    };
    const handleNextSong = () => {
        const nextSong = data.queue[positionInQueue + 1];
        if(nextSong) {
            dispatch({type: 'SET_SONG', payload: {song: nextSong}});
        }
    };

    return <Fragment>
        <Card variant='outlined' className={classes.container}>
            <div className={classes.cardInfo}>
                <CardContent className={classes.content} >
                    <Typography gutterBottom variant='h5' component='h3'>
                        {state.song.title}
                    </Typography>
                    <Typography variant='subtitle1' component='p' color='textSecondary'>
                        {state.song.artist}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton onClick={handlePrevSong}>
                        <SkipPrevious />
                    </IconButton>
                    <IconButton onClick={handleTogglePlay}>
                        {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} /> }
                    </IconButton>
                    <IconButton onClick={handleNextSong}>
                        <SkipNext />
                    </IconButton>
                    <Typography variant='subtitle1' component='p' color='textSecondary'>
                        {formatDuration(playedSeconds)}
                </Typography>
                </div>
                <Slider
                    onMouseDown={handleOnMouseDown}
                    onMouseUp={handleOnMouseUp}
                    onChange={handleProgressChange}
                    value={played}
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                />
            </div>
            <ReactPlayer
                ref={reactPlayerRef}
                url={state.song.url} 
                playing={state.isPlaying} 
                hidden 
                onProgress={({played, playedSeconds}) => {
                    if(!seeking) {
                        setPlayed(played);
                        setPlayedSeconds(playedSeconds);
                    } 
                }}    
            />
            <CardMedia image={state.song.thumbnail} className={classes.thumbnail} />
            {/* <img src={song.thumbnail} className={classes.thumbnail} alt='thumbnail' /> */}
        </Card>
        <QueuedSongList queue={data.queue} />
    </Fragment>
};

export default SongPlayer;
