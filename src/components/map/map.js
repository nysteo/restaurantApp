import React, { Component, props } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

 
class SimpleMap extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 14
  };
 
  render() {
    console.log(this.props);
    const center = [this.props.userLat, this.props.userLon];
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBmgOiH7X5LLYQobkagdguj77-wMrojGDI' }}
          defaultCenter={center }
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;