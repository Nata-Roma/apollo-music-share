import React from 'react';
import { Card, CardContent, Typography, makeStyles, CardActions, IconButton, Avatar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
    },
    thubmnail: {
        width: 50,
        height: 50,
        marginRight: theme.spacing(2),
    }
}));

const FavSongCard = ( song ) => {
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: (data) => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    });
    const classes = useStyles();

    const {title, artist, thumbnail} = song;

    const handleAddOrRemoveFromQueue = () => {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: 'Song' } }
        })
    };

    return (
        <Card className={classes.container}>
            <CardContent className={classes.cardContent}>
                <Avatar src={thumbnail} className={classes.thubmnail} alt='Song thunmbnail' />
                <div>
                    <Typography gutterBottom variant='subtitle2'>
                        {title}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                        {artist}
                    </Typography>
                </div>

            </CardContent>
            <CardActions>
                <IconButton onClick={handleAddOrRemoveFromQueue}>
                    <Delete color='error' />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default FavSongCard;