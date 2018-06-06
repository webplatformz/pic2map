import React from 'react'
import Map from './Map';
import Timeline from './Timeline';
import './Workspace.css';
import {loadTripSuccessful} from "../../../actions/tripActions";
import {getTrip} from "../../../middleware/api";
import {connect} from "react-redux";

class Workspace extends React.Component {

    constructor(props) {
        super(props);
        this.deleteWorkspace = this.deleteWorkspace.bind(this);
    }

    componentDidMount() {
        getTrip(this.props.match.params.id)
            .then(response => {
                response.json().then(value => {
                    this.props.loadTripSuccessful(value);
                });
            })
            .catch(error => console.error(error));
    }

    deleteWorkspace() {
        const id = this.props.match.params.id;
        fetch(`/api/workspace/${id}`, {method: 'DELETE'})
            .then(() => {
                this.props.history.push('/');
            })
            .catch(() => {
                console.error("Could not delete workspace");
            });
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
                <button onClick={this.deleteWorkspace}>
                    Workspace löschen
                </button>
            </div>
        );
    }
}

export default connect(
    (state) => ({trip: state.trip}),
    {loadTripSuccessful}
)(Workspace);

