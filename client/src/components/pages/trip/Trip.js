import React from 'react'
import {connect} from "react-redux";

import Map from './Map';
import Timeline from './Timeline';
import './Trip.css';
import {loadTripSuccessful} from "../../../actions/tripActions";
import {getTrip} from "../../../middleware/api";

class Trip extends React.Component {

    componentDidMount() {
        getTrip(this.props.match.params.tripId)
            .then(response => response.json())
            .then(trip => this.props.loadTripSuccessful(trip))
            .catch(error => console.error(error));
    }

    render() {
        if (!this.props.trip.tripId) {
            return <div>Loading...</div>;
        }

        return (
            <div id="trip-container">
                <Map/>
                <Timeline/>
            </div>
        );
    }
}

export default connect(
    (state) => ({trip: state.trip}),
    {loadTripSuccessful}
)(Trip);

