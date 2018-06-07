import React from 'react'
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

import Map from './Map';
import Timeline from './Timeline';
import {loadTripSuccessful} from "../../../actions/tripActions";
import {getTrip} from "../../../middleware/api";
import styled from "styled-components";

const TripContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
`;

const LoadingBox = styled.div `
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;  
`;


class Trip extends React.Component {

    componentDidMount() {
        getTrip(this.props.match.params.tripId)
            .then(response => response.json())
            .then(trip => this.props.loadTripSuccessful(trip))
            .catch(error => console.error(error));
    }

    render() {
        if (!this.props.trip.tripId) {
            return (
                <LoadingBox>
                    <CircularProgress size={50}/>
                </LoadingBox>
            );
        }

        return (
            <TripContainer>
                <Map/>
                <Timeline/>
            </TripContainer>
        );
    }
}

export default connect(
    (state) => ({trip: state.trip}),
    {loadTripSuccessful}
)(Trip);

