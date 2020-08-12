import React from 'react';
import {Grid, Typography, makeStyles, Button, Box, Link} from '@material-ui/core';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
    root: {
        maxWidth: 345,
    }
}));


const RestaurantItem = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
            title= {props.Name}
            subheader= {props.Cuisine}
            />
            <CardMedia
                className={classes.media}
                image= {props.Image}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Address: {props.Address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {props.Price}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default RestaurantItem;
