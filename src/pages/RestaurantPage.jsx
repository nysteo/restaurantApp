import React, {useState, useEffect} from 'react';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';

import history from '../history';


const useStyles = makeStyles((theme) => ({
    container: {
        background: '#F2F2F4',
        height: '100vh',
        
    },
    greetingsContainer: {
        background: '#F1EFF8',
        padding: '1rem 3rem',
    },
    media: {
    width: '100%',
    height: '430px',
    },
    secondaryContainer: {
        background: '#FFFFFF',
        height: '400px',
        padding: '1rem 3rem',
    }
}));

const RestaurantPage = (props) => {
    const apiLink = 'https://developers.zomato.com/api/v2.1/';
    const [name, setName] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [address, setAddress] = useState('');
    const [numReviews, setNumReviews] = useState(0);

    const classes = useStyles();

    const handleReload = () => {
        if (props.location.data === undefined){
            history.push('/')
        }
    }

    const handleBack = () => {
        history.push('/');
    }
    
    useEffect(()=> {    
        fetch(`${apiLink}restaurant?res_id=${props.location.data}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'user-key': '095b809ac98db3a604cbfc6b0ed72fe8',
            }})
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setName(res.name);
              setFeaturedImage(res.featured_image);
              setPriceRange(res.price_range);
              setPhoneNumber(res.phone_numbers);
              setCuisine(res.cuisines);
              setAddress(res.location.address);
              setNumReviews(res.all_reviews_count);

            },
            (error) => {
                console.log(error);
            });
            handleReload();
            // fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${props.location.userLat},${props.location.userLon}&destinations=${restaurantLat},${restaurantLon}&key=AIzaSyBmgOiH7X5LLYQobkagdguj77-wMrojGDIY`, {
            //     method: 'GET',
            //     headers: {
            //         'Accept': 'application/json',
            //         'RequestMode': 'no-cors',
            //     }})
            //     .then((res) => res.json())
            //     .then((res) => {
            //       console.log(res);
            //     },
            //     (error) => {
            //         console.log(error);
            //     });

    });
    return (
        <Fade in timeout = {4000}>
            <div className = {classes.container}>
                <Grid container direction = 'row' spacing = {0} justify = 'center' alignItems = 'stretch' alignContent = 'stretch'>
                    <Grid item xs={12} md={9} lg={7} xl={7} style={{marginLeft: '1rem', marginTop: '1rem'}}>
                        <Grid item xs={3}  style={{marginLeft: '1rem', marginTop: '1rem', height: '80vmin'}}>
                            <Grid container direction='column' spacing={0}>
                                <Grid item> <img className = {classes.media} alt = 'restaurant' src = {featuredImage}/></Grid>
                            </Grid>                        
                        </Grid>
                        <Grid item xs={4}  style={{ marginTop: '1rem', height: '80vmin'}}>
                            <Grid container direction='column' spacing={0}>
                                <Grid Item>
                                    <div className = {classes.secondaryContainer}>
                                        <Typography variant = 'h4'><Box fontWeight = 'bold'>{name}</Box> </Typography>
                                        <Typography variant = 'h6'>Address: {address}</Typography>
                                        <Typography cariant = 'h6'>Phone Number(s): {phoneNumber}</Typography>
                                        <Typography variant = 'h6'>Cuisine: {cuisine}</Typography> 
                                        <Typography variant = 'h6'>Price: {priceRange === 1 && ' $'}{priceRange === 2 && ' $$'}{priceRange === 3 && ' $$$'}{priceRange === 4 && ' $$$'}</Typography>
                                        <Typography variant = 'h6'>Number of Reviews: {numReviews}</Typography>
                                    </div>
                                </Grid> 
                            </Grid>
                            <Grid container direction = 'row' justify = 'center'>
                                <Grid Item><Button variant="contained" color="primary" onClick = {handleBack}> Back to Home </Button></Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Fade>

        
        
    );
    

}

export default RestaurantPage;