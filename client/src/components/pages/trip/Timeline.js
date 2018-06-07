import React from 'react';
import {connect} from "react-redux";
import FileUpload from "./FileUpload";
import TimelineElement from "./TimelineElement";
import styled from 'styled-components';

const TimelineContainer = styled.div`
    padding: 0 20px;
    background-color: rgba(255, 255, 255, 0.91);
    flex: 1 1 0;
    height: 100%;
    overflow: auto;
`;

const DeleteButton = styled.button`
    margin-top: 10px;
`;

const TimelineElements = styled.ul`
    padding-left: 10px;
    
    li {
        list-style-type: none;
        position: relative;
        padding: 20px 30px;
        border-left: 1px solid black;
    }
    
    li:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        background-color: #000;
        border-radius: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
`;


class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editMode: true};
        this.deleteTrip = this.deleteTrip.bind(this);
    }

    deleteTrip() {
        const tripId = this.props.trip.tripId;
        fetch(`/api/trips/${tripId}`, {method: 'DELETE'})
            .then(() => {
                this.props.history.push('/');
            })
            .catch(() => {
                console.error("Could not delete trip");
            });
    }
    
    renderImageElement(image) {
        return <TimelineElement image={image}/>
    }

    render() {
        const editMode = this.state.editMode;

        const imageElements = this.props.trip.images.map(
            image => <li key={image.imageId}>{this.renderImageElement(image)}</li>
        );

        const editElements = editMode ? (
            <div>
                <DeleteButton onClick={this.deleteTrip}>Trip löschen</DeleteButton>
                <FileUpload/>
            </div>
        ) : null;

        return (
            <TimelineContainer>
                {editElements}
                <h1>Timeline</h1>
                <TimelineElements>
                    {imageElements}
                </TimelineElements>
            </TimelineContainer>
        );
    }
}

export default connect(
    state => ({
        trip: state.trip
    })
)(Timeline);
