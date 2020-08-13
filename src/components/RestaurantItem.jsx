import React from 'react';
import {Grid, Typography, makeStyles, Button, Box, Link} from '@material-ui/core';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
    },
    media: {
        height: '200px',
        width: '450px',
    }

}));


const RestaurantItem = (props) => {
    const classes = useStyles();
    console.log(props.Image);

    return (
        <Grid  className = {classes.root} container  direction = 'column' spacing = {50}>
            <Grid Item ><img className = {classes.media} src = {props.Image}/></Grid>
            <Grid Item><Typography variant = 'h6'><Box fontWeight = 'bold'> {props.Name} ({props.Address})</Box></Typography></Grid>
            <Grid Item>  {props.Cuisine} - Price: {props.Price == 1 && ' $'}{props.Price == 2 && ' $$'}{props.Price == 3 && ' $$$'}{props.Price == 4 && ' $$$'}</Grid>
        </Grid>
    )
}

export default RestaurantItem;
