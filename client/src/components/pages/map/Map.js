import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl';
import FileUpload from './FileUpload';

const MapBox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ'
});

const Map = () => (
    <div>
        <div>Please kindly note, that you agree that we may process and store your pictures and meta data once you
            choose to upload any pictures. Please note that your pictures can be accessed publicly and may be stored and
            processed by third parties, including those located in other countries. Please do not use this website, if
            you do not agree to that.
        </div>
        <div>DELETE WORKSPACE - TODO link</div>
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