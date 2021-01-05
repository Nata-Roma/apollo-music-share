import { Card, Typography, CardContent, IconButton, makeStyles, Slider, CardMedia } from '@material-ui/core';
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React, { Fragment } from 'react';
import QueuedSongList from './QueuedSongList';

const song = {
    title: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynyrd',
    thumbnail: 'https://i.ytimg.com/vi/IwWUOmk7wO0/hqdefault.jpg'
};

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
    const classes = useStyles();
    return <Fragment>
        <Card variant='outlined' className={classes.container}>
            <div className={classes.cardInfo}>
                <CardContent className={classes.content} >
                    <Typography gutterBottom variant='h5' component='h3'>
                        {song.title}
                    </Typography>
                    <Typography variant='subtitle1' component='p' color='textSecondary'>
                        {song.artist}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton>
                        <SkipPrevious />
                    </IconButton>
                    <IconButton>
                        <PlayArrow className={classes.playIcon} />
                    </IconButton>
                    <IconButton>
                        <SkipNext />
                    </IconButton>
                    <Typography variant='subtitle1' component='p' color='textSecondary'>
                        00:01:30
                </Typography>
                </div>
                <Slider
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                />
            </div>
            <CardMedia image={song.thumbnail} className={classes.thumbnail} />
            {/* <img src={song.thumbnail} className={classes.thumbnail} alt='thumbnail' /> */}
        </Card>
        <QueuedSongList />
    </Fragment>
};

export default SongPlayer;
