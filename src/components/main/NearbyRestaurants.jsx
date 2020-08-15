import React from 'react';
import {Grid, Typography, makeStyles, Box, GridList} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        // borderRadius: '4px',
        // // background: '#fff',
        // padding: '1rem',
        // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        paddingBottom: '1rem',
    },
    link: {
        color: '#000',
    },
}));


const NearbyRestaurants = (props) => {
    const classes = useStyles();


    return (
    <Grid container direction='row'>
        <Grid item><Typography variant='h5' className={classes.label}><Box fontWeight='bold'>Nearby Restaurants</Box></Typography></Grid>
        <GridList cols = {props.columns} spacing = {100} cellHeight = 'auto'>
            {props.children}
        </GridList>
    </Grid>
    )
};
export default NearbyRestaurants;