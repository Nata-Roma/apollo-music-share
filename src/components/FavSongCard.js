import React from 'react';
import { Card, CardContent, Typography, makeStyles, CardActions, IconButton, Avatar } from '@material-ui/core';
import { Delete} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    container: {
        // marginBottom: theme.spacing(2),
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
        // objectFit: 'cover',
        marginRight: theme.spacing(2),
    }
}));

const FavSongCard = ({title, artist, thumbnail}) => {
        const classes = useStyles();
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
                <IconButton>
                    <Delete color='error' />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default FavSongCard;