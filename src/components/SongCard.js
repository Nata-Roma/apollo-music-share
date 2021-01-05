import React from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles, CardActions, IconButton } from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';

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

const SongCard = ({ title, artist, thumbnail }) => {
    const classes = useStyles();
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
                <IconButton color='primary' size='small'>
                    <PlayArrow />
                </IconButton>
                <IconButton color='secondary' size='small'>
                    <Save />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default SongCard;