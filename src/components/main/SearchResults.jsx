import React from 'react';
import {Grid, Typography, makeStyles, Box, Link, GridList} from '@material-ui/core';

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
        color: '#FECC2A',
        cursor: 'pointer',
    },
}));

const SearchResults = (props) => {
    const classes = useStyles();
    return (
        <Grid container direction = 'row'>
            <Grid item><Typography variant='h5' className={classes.label}><Box fontWeight='bold' component = 'span' m = {1}>Search Results</Box><Link className = {classes.link} onClick = {props.resetSearch}> Clear Results </Link></Typography></Grid>
            <GridList cols = {props.columns} spacing = {100} cellHeight = 'auto'>
                {props.children}
            </GridList>
        </Grid>


    )
}

export default SearchResults;