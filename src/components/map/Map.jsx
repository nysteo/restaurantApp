import React, {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import LocationIcon from '@material-ui/icons/LocationOn'
import UserIcon from '@material-ui/icons/Person';
import { Typography, Grid, Box } from '@material-ui/core';

const RestaurantMap = (props) => {
  const [nearbyRestaurants, setNearbyRestaurants] = useState(null);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);

  const UserPin = ()=> (
    <div className = "pin">
      <UserIcon style = {{color: '#FECC2a', height: '35px', width: '35px'}}></UserIcon>
      <Typography>You Are Here</Typography>

    </div>
  )

  const LocationPin = ({ text }) => (
    <div className="pin">
      <LocationIcon style = {{color: '#FECC2A', height: '35px', width: '35px'}}></LocationIcon>
      <Typography>{text}</Typography>
    </div>
  )

  return (
    <Grid item>
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBmgOiH7X5LLYQobkagdguj77-wMrojGDI' }}
          defaultCenter={{ lat: props.userLat, lng: props.userLon }}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals
        >
        <UserPin lat = {props.userLat} lng = {props.userLon}></UserPin>
        {props.nearbyRestaurants.map((select, index) => {
          return <LocationPin
          lat={select.restaurant.location.latitude}
          lng={select.restaurant.location.longitude}
          text={select.restaurant.name}
        />
        })}
          
        </GoogleMapReact>
    </div>
  </Grid>

);



};

export default RestaurantMap;