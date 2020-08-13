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
    },
    media: {
        height: '100px',
        width: '345px',
    }

}));


const RestaurantItem = (props) => {
    const classes = useStyles();
    console.log(props.Image);

    return (
        <Card className={classes.root}>
            <CardHeader
            title= {props.Name}
            subheader= {props.Cuisine}
            />
            <CardMedia className = {classes.media} square image ={props.Image} />
 
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
