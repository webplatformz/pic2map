import React from 'react'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import {connect} from "react-redux";
import styled from 'styled-components';

const MapContainer = styled.div`
    flex-basis: 800px;
    flex-grow: 2;
    flex: 3 1 0;
`;

const Mapbox = styled.div`
    width: 100%;
    height: 100%;
`;

const imageLayerGroup = new L.markerClusterGroup();
const accessToken = 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ';
let map;

class Map extends React.Component {

    componentDidMount() {
        this.initialiseMap();
    }

    render() {
        this.recomputeMarkers();
        return (
            <MapContainer id="map-container">
                <Mapbox id="map"/>
            </MapContainer>
        );
    }

    initialiseMap() {
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

        map = L.map('map')
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
    }

    recomputeMarkers() {
        imageLayerGroup.clearLayers();
        this.addMarkers(this.props.trip.tripId);

        if (map) {
            map.fitBounds(this.computeMapBoundaries());
        }
    }

    addMarkers(tripId) {
        for (const image of this.props.trip.images) {
            if (this.imageWithLocationData(image)) {
                const icon = L.icon({
                    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                    /*iconUrl: `/api/trips/${tripId}/images/${image.imageId}`,*/
                    iconSize: [38, 95], // size of the icon
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                const marker = L.marker([image.location.lat, image.location.lng]);
                marker.setIcon(icon);
                marker.bindPopup(`<img src="/api/trips/${tripId}/images/${image.imageId}"/>`);
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });
                marker.addTo(imageLayerGroup);
            }
        }
    }

    computeMapBoundaries() {
        let maxLat = -90; // top left corner latitude
        let minLong = 180; // top left corner longitude
        let minLat = 90; // bottom right corner latitude
        let maxLong = -180; // bottom right corner longitude
        for (const image of this.props.trip.images) {
            if (this.imageWithLocationData(image)) {
                if (image.location.lat > maxLat) {
                    maxLat = image.location.lat;
                }
                if(image.location.lat < minLat) {
                    minLat = image.location.lat;
                }
                if (image.location.lng < minLong) {
                    minLong = image.location.lng;
                }
                if (image.location.lng > maxLong) {
                    maxLong = image.location.lng;
                }
            }
        }
        return [
            [maxLat, minLong],
            [minLat, maxLong]
        ];
    }

    imageWithLocationData(image) {
        return image.location && image.location.lat && image.location.lng;
    }

}

function mapsStateToProps(state) {
    return {
        trip: state.trip
    };
}

export default connect(mapsStateToProps)(Map);

