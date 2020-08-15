import React, {useEffect, useState} from 'react';
import { Typography, Grid, Fade, makeStyles, Box} from '@material-ui/core'
import './App.css';
import NearbyRestaurants from 'components/main/NearbyRestaurants';
import RestaurantItem from 'components/main/RestaurantItem';
import RestaurantSearch from 'components/main/RestaurantSearch';
import history from './history';
import SearchResults from 'components/main/SearchResults';
import  isWidthUp from '@material-ui/core/withWidth';
import RestaurantMap from 'components/map/Map';


const useStyles = makeStyles((theme) => ({
  container: {
    background: "#F2F2F4",
    height: '230vh',
    maxWidth: '100vw',
    padding: '2rem 2rem 2rem 2rem',
    [theme.breakpoints.down('lg')]: {
      padding: '1rem 1rem 1rem 1rem'
    },
  },
  greetingsContainer: {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    background: '#FECC2A',
    padding: '1rem 3rem',
    borderRadius: '4px',
  }
  
}));



const App = (props) => {
  const apiLink = 'https://developers.zomato.com/api/v2.1/';
  const classes = useStyles();
  const [userLat, setLat] = useState(null);
  const [userLon, setLon] = useState(null);
  const [userLocation, setUserLocation] = useState('unknown');
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [searchRestaurants, setSearchRestaurants] = useState([]);
  const [isSearched, setIsSearched] = useState(false);


  const getGridListCols = () => {
    if ( isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('lg', props.width)) {
      return 4;
    }

    if (isWidthUp('md', props.width)) {
      return 4;
    }

    if (isWidthUp('xs', props.width)) {
      return 2;
    }

    return 1;
  }



  const SearchRender = () => {
    return (
      <SearchResults columns = {getGridListCols} resetSearch = {() => resetSearch()}>
      {searchRestaurants.slice(0, 8).map((select, index) => {
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
      </SearchResults>
    );

  }




  const incrstate = (inputValue) => {
    setIsSearched(true);
    console.log(inputValue);
    fetch(`${apiLink}/search?q=${inputValue}&lat=${userLat}&lon=${userLon}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'user-key': '6a14e6f5ec6a7ff2475989f5ba2b27e9',
      }})
      .then((res) => res.json())
      .then((res) => {
        setSearchRestaurants(res.restaurants);
      },
      (error) => {
          console.log(error);
      });

  }


  const resetSearch = () => {
    setSearchRestaurants([]);
  }


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });

    if(userLat != null && userLon != null){
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

    }

  });

  return (
    <Fade in timeout={1000}>
      <div className = {classes.container}>
        <Grid container direction = 'row' spacing = {0} justify = 'center' alignItems = 'stretch' alignContent = 'strecth'>
          
          <Grid item xs={12} md={6} lg={7} xl={7} style={{marginLeft: '1rem', marginTop: '1rem', height: '80vmin'}}>
            <Grid container direction='column' spacing={8}>
                {/* <Navbar/> */}
                <Grid item>
                    <div className={classes.greetingsContainer}>
                        <Typography variant='h6'><Box fontWeight='bold'>Restaurant Finder</Box></Typography>
                        <Typography variant='subtitle2' style={{opacity: '0.7'}}>Current Location: {userLocation} </Typography>
                    </div>
                </Grid>
                <Grid item>
                  <Typography variant='h6'><Box fontWeight='bold'>Search</Box></Typography>
                  <RestaurantSearch incrstate = {(inputValue) => incrstate(inputValue)}/>
                </Grid>
                <Grid item>

                    {isSearched ? SearchRender() : ''}
                </Grid>
                <Grid item>
                  <NearbyRestaurants columns = {getGridListCols}>
                    {nearbyRestaurants.slice(0, 8).map((select, index) => {
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
                  <Grid item><Typography variant = 'h4'><Box fontWeight = 'bold'> Near You</Box> </Typography></Grid>
                  <RestaurantMap userLat = {userLat} userLon = {userLon} nearbyRestaurants = {nearbyRestaurants}></RestaurantMap>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fade>
  
    );

  
  
}

export default App;
