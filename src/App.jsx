import React, {useEffect, useState} from 'react';
import {ThemeProvider, createMuiTheme, responsiveFontSizes, Typography, Grid, Fade, Button, makeStyles, Box} from '@material-ui/core'
import logo from './logo.svg';
import './App.css';
import RestaurantPage from 'pages/RestaurantPage';
import NearbyRestaurants from 'components/main/NearbyRestaurants';
import RestaurantItem from 'components/main/RestaurantItem';
import RestaurantSearch from 'components/main/RestaurantSearch';
import history from './history';



//Set up theme for Styling
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
  const [render, setRender] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [selectedResID, setSelectedResID] = useState(null);

  const [text, setText] = useState('');

  const incrstate = (inputValue) => {
    setRender(render + 1);
    console.log(inputValue);
    fetch(`${apiLink}/search?q=${inputValue}&lat=${userLat}&lon=${userLon}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'user-key': '6a14e6f5ec6a7ff2475989f5ba2b27e9',
      }})
      .then((res) => res.json())
      .then((res) => {
        setNearbyRestaurants(res.restaurants);
      },
      (error) => {
          console.log(error);
      });

  }

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
                        <Typography variant='h6'><Box fontWeight='bold'>Restaurant Finder</Box></Typography>
                        <Typography variant='subtitle2' style={{opacity: '0.7'}}>Current Location: {userLocation} </Typography>
                    </div>
                </Grid>
                <Grid item>
                  <RestaurantSearch incrstate = {(inputValue) => incrstate(inputValue)}/>
                </Grid>
                <Grid item>
                  <NearbyRestaurants>
                    {nearbyRestaurants.slice(0, 9).map((select, index) => {
                      return <Grid item key = {index} onClick={() => history.push({
                        pathname: '/RestaurantPage',
                        data: select.restaurant.R.res_id,
                        userLat: userLat,
                        userLon: userLon,
                      })}>
                        <RestaurantItem
                          Name = {select.restaurant.name}
                          Cuisine = {select.restaurant.cuisines}
                          Address = {select.restaurant.location.address}
                          Price = {select.restaurant.price_range}
                          Image = {select.restaurant.featured_image}
                          resID = {select.restaurant.R.res_id}
                        />

                      </Grid>

                    })}
                  </NearbyRestaurants>
                </Grid>
                <Grid Item>
                  {/* <RestaurantMap></RestaurantMap> */}
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fade>
  
    );

  
  
}

export default App;
