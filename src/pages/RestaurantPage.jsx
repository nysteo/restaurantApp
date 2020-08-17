import React, {useState, useEffect} from 'react';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';
import exampleImage from 'images/example.jpeg';
import StarIcon from '@material-ui/icons/Star';

import history from '../history';


const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        maxWidth: '100vw',
        padding: '2rem 2rem 2rem 2rem',
        [theme.breakpoints.down('lg')]: {
          padding: '1rem 1rem 1rem 1rem'
        },
        
    },
    descContainer: {
        padding: '1rem 2rem',
    },
    media: {
        width: '100%',
        height: '500px',
        [theme.breakpoints.down('md')]: {
            height: '200px',
        }
    },
    highlight: {
        background: '#FECC2A',
        padding: '3px 6px 3px 6px',
        borderRadius: '5px',

    },
    rating: {
        padding: '6px 6px 6px 6px',
        borderRadius: '5px',
        background: '#47C594'
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
    const [isRendered, setIsRendered] = useState(false);
    const [highlights, setHighlights] = useState([]);
    const [userRating, setUserRating] = useState([]);

    const classes = useStyles();

    const handleReload = () => {
        if (props.location.data === undefined){
            history.push('/')
        }
    }

    const handleBack = () => {
        history.push('/');
    }

    const renderMedia = () => {
        return ( 
        <Grid item xs={3}  style={{marginLeft: '1rem', marginTop: '1rem', height: '80vmin'}}>
            <Grid container direction='column' spacing={0}>
                <Grid item> <img className = {classes.media} alt = 'restaurant' src = {featuredImage}/></Grid>
            </Grid>                        
        </Grid>
        )
    }
    
    useEffect(()=> {    
        if(isRendered !== true){
            fetch(`${apiLink}restaurant?res_id=${props.location.data}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'user-key': '917d2a0d3ae99fe3914254e338958ce8',
                }})
                .then((res) => res.json())
                .then((res) => {
                    setIsRendered(true);
                  console.log(res);
                  setName(res.name);
                  setFeaturedImage(res.featured_image);
                  setPriceRange(res.price_range);
                  setPhoneNumber(res.phone_numbers);
                  setCuisine(res.cuisines);
                  setAddress(res.location.address);
                  setNumReviews(res.all_reviews_count);
                  setHighlights(res.highlights);
                  setUserRating(res.user_rating);

    
                },
                (error) => {
                    console.log(error);
                });
                handleReload();
        }


    });
    return (
        <Fade in timeout = {4000}>
            <div className = {classes.container}>
                <Grid container direction = 'row' spacing = {0} justify = 'center' alignItems = 'stretch' alignContent = 'stretch'>
                    <Grid item xs={12} md={6} lg={7} xl={7} style={{marginLeft: '1rem', marginTop: '1rem', height: '80vmin'}}>
                        <Grid container direction='column' spacing={8}>
                            <Grid item> 
                                <img className = {classes.media} alt = 'restaurant' src = {featuredImage ? featuredImage : exampleImage}/>
                            </Grid>    
                            <Grid Item>
                                <div className = {classes.descContainer}>
                                    <Typography variant = 'h4'><Box fontWeight = 'bold' component = 'span' m = {1}>{name}</Box><Box fontWeight='bold' component = 'span' m = {1} className = {classes.highlight}><StarIcon/>{userRating.aggregate_rating}</Box> </Typography>
                                    <Typography variant = 'h6'>Address: {address}</Typography>
                                    <Typography cariant = 'h6'>Phone Number(s): {phoneNumber}</Typography>
                                    <Typography variant = 'h6'>Cuisine: {cuisine}</Typography> 
                                    <Typography variant = 'h6'>Price: {priceRange === 1 && ' $'}{priceRange === 2 && ' $$'}{priceRange === 3 && ' $$$'}{priceRange === 4 && ' $$$'}</Typography>
                                    <Typography variant = 'h6'>Number of Reviews: {numReviews}</Typography>
                                    <Typography variant = 'h6'> Highlights: </Typography>
                                    <Grid container direction = 'row' spacing = {2}>
                                        {highlights.map((select, index) => {
                                            return <Grid item><Typography className = {classes.highlight}>{select}</Typography></Grid>
                                        })}
                                    </Grid>
                                </div>
                            </Grid>     
                        </Grid>            
                    </Grid>
                </Grid>
            </div>
        </Fade>

        
        
    );
    

}

export default RestaurantPage;