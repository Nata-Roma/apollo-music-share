import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { PlayForWorkRounded, PlaylistAddRounded } from '@material-ui/icons';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import ReactPlayer from 'react-player';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        marginRight: theme.spacing(2),
    },
    addButton: {
        marginRight: theme.spacing(2),
    },
    dialog: {
        textAlign: 'center',
    },
    songThubmnail: {
        width: '90%',
    }
}));

const DEFAULT_SONG = {
    duration: 0,
    title: '',
    artist: '',
    thumbnail: ''
};

const AddSong = () => {
    const [addSong, { error }] = useMutation(ADD_SONG);
    const [openDialog, setOpenDialog] = useState(false);
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [payable, setPayable] = useState(false);
    const [song, setSong] = useState(DEFAULT_SONG);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        const isPlayable = SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
        setPayable(isPlayable);
    }, [url]);

    const handleChangeSong = (e) => {
        const { name, value } = e.target;
        setSong((prevSong) => ({
            ...prevSong,
            [name]: value
        }))
    }

    const handleEditSong = async ({ player }) => {
        const nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer);
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundcloudInfo(nestedPlayer);
        };
        setSong({ ...songData, url });
    };

    const getYoutubeInfo = (player) => {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    };

    const getSoundcloudInfo = (player) => {
        return new Promise((resolve) => {
            player.getCurrentSound((songData) => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData.title,
                        artist: songData.user.userName,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }

    const handleAddSong = async () => {
        try {
            const { title, artist, duration, thumbnail, url } = song;
            await addSong({
                variables: {
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    url: url.length > 0 ? url : null,
                    duration: duration > 0 ? duration : null,
                }
            })
            handleCloseDialog();
            setSong(DEFAULT_SONG);
            setUrl('');
        } catch (error) {
            console.error('Error adding song', error)
        }
    };

    const handleError = (field) => {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);
    };

    const { thumbnail, title, artist } = song;

    return (
        <div className={classes.container}>
            <Dialog className={classes.dialog} open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src={thumbnail}
                        alt='Song thumbnail'
                        className={classes.songThubmnail}
                    />
                    <TextField
                        margin='dense'
                        name='title'
                        label='Title'
                        fullWidth value={title}
                        onChange={handleChangeSong}
                        error={handleError('title')}
                        helperText={handleError('title') && 'Fill out the field'}
                    />
                    <TextField 
                        margin='dense' 
                        name='artist' 
                        label='Artist' 
                        fullWidth value={artist} 
                        onChange={handleChangeSong} 
                        error={handleError('artist')}
                        helperText={handleError('artist') && 'Fill out the field'} 
                    />
                    <TextField 
                        margin='dense' 
                        name='thumbnail' 
                        label='Thumbnail' 
                        fullWidth value={thumbnail} 
                        error={handleError('thumbnail')}
                        helperText={handleError('thumbnail') && 'Fill out the field'} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={handleCloseDialog}>Cancel</Button>
                    <Button color='primary' variant='outlined' onClick={handleAddSong}>Add song</Button>
                </DialogActions>

            </Dialog>
            <TextField
                className={classes.urlInput}
                placeholder='Add Youtube or Soundcloud Url'
                fullWidth
                type='url'
                margin='normal'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PlayForWorkRounded />
                        </InputAdornment>
                    ),
                }}
            >
                <PlayForWorkRounded />
            </TextField>
            <Button
                disabled={!payable}
                className={classes.addButton}
                variant='contained'
                color='primary'
                endIcon={<PlaylistAddRounded />}
                onClick={() => setOpenDialog(true)}
            >
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    )
};

export default AddSong;
