import React from 'react'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import './Map.css';
import {connect} from "react-redux";

const accessToken = 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ';

class Map extends React.Component {

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

        const imageLayerGroup = new L.LayerGroup();

        const map = L.map('map')
            .setView([47.29040794, 8.52401733], 12) // center roughly on Zurich ;)
            .addLayer(mbSatelliteLayer)
            .addLayer(osmLayer)
            .addLayer(mbOutdoorsLayer)
            .addLayer(osmOutdoorsLayer)
            .addLayer(imageLayerGroup);

        // leaflet control to choose base layer and toggle markers
        L.control
            .layers({
                'Open Street Map': osmLayer,
                'MapBox Satellite': mbSatelliteLayer,
                'MapBox Outdoors': mbOutdoorsLayer,
                'Open Street Map Outdoors': osmOutdoorsLayer
            }, {
                'Images': imageLayerGroup
            })
            .addTo(map);

        const markers = L.markerClusterGroup();
        for (const image of this.props.workspace.images) {
                 const icon = L.icon({
                     iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                     iconSize:     [38, 95], // size of the icon
                     iconAnchor:   [22, 94],
                     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                 });

            //const marker = L.marker(image.geo.geometry.coordinates);
            const marker = L.marker([image.location.lat, image.location.lng]);
                 marker.setIcon(icon);
                 marker.bindPopup('<img src="https://leafletjs.com/examples/custom-icons/leaf-green.png"/>');
                 marker.on('mouseover', function (e) {
                     this.openPopup();
                 });
                 marker.on('mouseout', function (e) {
                     this.closePopup();
                 });
                 marker.addTo(markers);
        }
        map.addLayer(markers)
    }

    render() {
        return (
            <div id="map-container">
                <div id="map"/>
            </div>
        );
    }
}

function mapsStateToProps(state) {
    return {
        workspace: state.trip
    };
}

export default connect(mapsStateToProps)(Map);

