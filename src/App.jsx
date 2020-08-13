import React, {useEffect, useState} from 'react';
import {ThemeProvider, createMuiTheme, responsiveFontSizes, Typography, Grid, Fade, Button, makeStyles, Box} from '@material-ui/core'
import logo from './logo.svg';
import './App.css';
import NearbyRestaurants from 'components/NearbyRestaurants';
import RestaurantItem from 'components/RestaurantItem';

const contrastText = '#2C3C56';
let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#306DDF',
            contrastText: '#ffff',
        },
        secondary: {
            main: '#FEAD18',
            contrastText: contrastText,
        },
        error: {
            main: '#F46D66',
            contrastText: contrastText,
        },
        info: {
            main: '#7064D0',
            contrastText: contrastText,
        },
        success: {
            main: '#47C594',
            contrastText: contrastText,
        },
        background: '#F5F8FF',
        text: {
            primary: '#2C3C56',
            secondary: '#AEAEAE',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
    overrides: {
        MuiTab: {
            wrapper: {
                flexDirection: 'row',
            },
        },
    },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#EBEFF2',
    height: '100vh',
  },
  greetingsContainer: {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    background: '#306CDF',
    padding: '1rem 3rem',
    borderRadius: '4px',
    color: '#fff',
  }
  
}));



const App = (props) => {
  const apiLink = 'https://developers.zomato.com/api/v2.1/';
  const classes = useStyles();
  const [userLat, setLat] = useState(40.7273472);
  const [userLon, setLon] = useState(-73.8492416);
  const [userLocation, setUserLocation] = useState('unknown');
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
    fetch(`${apiLink}/geocode?lat=${userLat}&lon=${userLon}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'user-key': '6a14e6f5ec6a7ff2475989f5ba2b27e9',
        }})
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setUserLocation(res.location.title);
          setNearbyRestaurants(res.nearby_restaurants);
        },
        (error) => {
            console.log(error);
        });
  }, [apiLink]);

  return (
    <Fade in timeout={1000}>
      <div className = {classes.container}>
        <Grid container direction = 'row' spacing = {0} justify = 'center' alignItems = 'stretch' alignContent = 'strecth'>
          <Grid item xs={12} md={6} lg={7} xl={7} style={{marginLeft: '1rem', marginTop: '1rem', height: '80vmin'}}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <div className={classes.greetingsContainer}>
                        <Typography variant='h6'><Box fontWeight='bold'>Restaurant Finder App</Box></Typography>
                        <Typography variant='subtitle2' style={{opacity: '0.7'}}>Current Location: {userLocation} </Typography>
                    </div>
                </Grid>
                <Grid item>
                  <NearbyRestaurants>
                    {nearbyRestaurants.map((select, index) => {
                      return <Grid item key = {index}>
                        <RestaurantItem
                          Name = {select.restaurant.name}
                          Cuisine = {select.restaurant.cuisines}
                          Address = {select.restaurant.location.address}
                          Price = {select.restaurant.price_range}
                          Image = {select.restaurant.featured_image}
                        />

                      </Grid>

                    })}
                  </NearbyRestaurants>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fade>

  );
}

export default App;
