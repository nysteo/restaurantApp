import React from 'react';
import {Grid, Typography, makeStyles, Button, Box, Link} from '@material-ui/core';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import exampleImage from 'images/example.jpeg';

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        maxWidth: '400px',
        fontFamily: 'Poppins',
    },
    media: {
        height: '200px',
        width: '100%',
        borderRadius: '5%',
    },

    highlight: {
        background: '#FECC2A',
        padding: '3px 6px 3px 6px',
        borderRadius: '5px',

    }

}));


const RestaurantItem = (props) => {
    const classes = useStyles();
    console.log(props.Image ? 'yes' : 'no');

    return (
        <Grid  className = {classes.root} container  direction = 'column' spacing = {30}>
            <Grid Item ><img className = {classes.media} src = {props.Image ? props.Image : exampleImage}/></Grid>
            <Grid Item><Typography variant = 'h7'><Box fontWeight = 'bold'>{props.Name}</Box> ({props.Address})</Typography></Grid>
            <Grid Item><Divider/></Grid>
            <Grid Item><Typography>  {props.Cuisine} - <span className ={classes.highlight}>Price: {props.Price == 1 && ' $'}{props.Price == 2 && ' $$'}{props.Price == 3 && ' $$$'}{props.Price == 4 && ' $$$'}</span> </Typography></Grid>
        </Grid>
    )
}

export default RestaurantItem;
