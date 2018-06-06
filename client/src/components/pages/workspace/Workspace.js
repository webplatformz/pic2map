import React from 'react'
import Map from './Map';
import Timeline from './Timeline';
import './Workspace.css';
import {loadTripSuccessful} from "../../../actions/tripActions";
import {getTrip} from "../../../middleware/api";
import {connect} from "react-redux";

class Workspace extends React.Component {

    componentDidMount() {
        getTrip(this.props.match.params.id)
            .then(response => {
                response.json().then(value => {
                    this.props.loadTripSuccessful(value);
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        if (!this.props.trip) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div id="workspace-container">
                    <Map/>
                    <Timeline/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({trip: state.trip}),
    {loadTripSuccessful}
)(Workspace);

