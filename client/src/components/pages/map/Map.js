import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl';
import FileUpload from './FileUpload';

const MapBox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ'
});

const Map = () => (
    <div>
        <MapBox // eslint-disable-next-line
            style="mapbox://styles/mapbox/streets-v8"
            containerStyle={{width: '100vw', height: '100vh'}}
        />
        <div>
            <h2> File upload </h2>
            <FileUpload/>
        </div>
    </div>
);

export default Map;