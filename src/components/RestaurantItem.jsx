import React from 'react';
import {Grid, Typography, makeStyles, Button, Box, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
}));


const RestaurantItem = (props) => {
    const classes = useStyles();

    return (
        <Grid container direction = 'row' alignItems = 'Center' justify = 'space-around' className =  {classes.container}>
            <Grid item><Typography><Box fontWeight = 'bold'>{props.Name}</Box></Typography></Grid>
            <Grid item><Typography><Box fontWeight = 'bold'>{props.Cuisine}</Box></Typography></Grid>
            <Grid item><Typography><Box fontWeight = 'bold'>{props.Adress}</Box></Typography></Grid>
            <Grid item><Typography><Box fontWeight = 'bold'>{props.Price}</Box></Typography></Grid>
            
        </Grid>
    )
}

export default RestaurantItem;
