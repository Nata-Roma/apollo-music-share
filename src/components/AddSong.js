import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { PlayForWorkRounded, PlaylistAddRounded } from '@material-ui/icons';

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

const AddSong = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const classes = useStyles();

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <div className={classes.container}>
            <Dialog className={classes.dialog} open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src='https://i1.sndcdn.com/artworks-000107899443-qxcwl0-t500x500.jpg'
                        alt='Song thumbnail'
                        className={classes.songThubmnail}
                    />
                    <TextField margin='dense' name='title' label='Title' fullWidth />
                    <TextField margin='dense' name='artist' label='Artist' fullWidth />
                    <TextField margin='dense' name='thumbnail' label='Thumbnail' fullWidth />
                </DialogContent>
                <DialogActions>
                <Button color='secondary' onClick={handleCloseDialog}>Cancel</Button>
                <Button color='primary' variant='outlined'>Add song</Button>
                </DialogActions>
                
            </Dialog>
            <TextField
                className={classes.urlInput}
                placeholder='Add Youtube or Soundcloud Url'
                fullWidth
                type='url'
                margin='normal'
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
                className={classes.addButton}
                variant='contained'
                color='primary'
                endIcon={<PlaylistAddRounded />}
                onClick={() => setOpenDialog(true)}
            >
                Add
            </Button>
        </div>
    )
};

export default AddSong;
