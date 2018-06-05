import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl';

const MapBox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ'
});

const Map = () => (
    <MapBox // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{width: '100vw', height: '100vh'}}
    />
);

export default Map;