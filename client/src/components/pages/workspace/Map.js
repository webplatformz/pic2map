import React from 'react'
import {Helmet} from 'react-helmet';
import L from 'leaflet';
import './Map.css';

const accessToken = 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ';

export class Map extends React.Component {

    componentDidMount() {
        // OSM Street
        const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>',
        });
        // OSM outdoors
        const osmOutdoorsLayer = L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=607960444b2e4a9787416bc54a1cc34e', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>',
        });

        // MapBox Satellite
        const mbSatelliteLayer = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://mapbox.com">MapBox</a>',
            accessToken: accessToken
        });

        // MapBox Outdoors
        const mbOutdoorsLayer = L.tileLayer('https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://mapbox.com">MapBox</a>',
            accessToken: accessToken
        });

        const leafletMap = L.map('map')
            .setView([47.29040794, 8.52401733], 12) // center roughly on Zurich ;)
            .addLayer(mbSatelliteLayer)
            .addLayer(osmLayer)
            .addLayer(mbOutdoorsLayer)
            .addLayer(osmOutdoorsLayer);

        // leaflet control to choose base layer and toggle markers
        L.control
            .layers({
                'Open Street Map': osmLayer,
                'MapBox Satellite': mbSatelliteLayer,
                'MapBox Outdoors': mbOutdoorsLayer,
                'Open Street Map Outdoors': osmOutdoorsLayer
            })
            .addTo(leafletMap);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
                          integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
                          crossOrigin=""/>
                    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
                            integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
                            crossorigin=""></script>
                </Helmet>
                <div id="map"/>
            </div>
        );
    }
}

