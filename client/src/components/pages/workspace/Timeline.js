import React from 'react';
import './Timeline.css'
import * as moment from 'moment';
import {connect} from "react-redux";
import FileUpload from "./FileUpload";

class ImageElement extends React.Component {
    render() {
        const date = moment(this.props.image.date);

        return (
            <div className="image-container">
                <img alt="Placeholder"
                     src="https://www.amv-mz.de/wp-content/themes/oria-child/images/placeholder.png"/>
                <div className="content">
                    <h3>{date.format('ddd, DD.MM.YYYY')}</h3>
                    <p>{this.props.image.title}</p>
                </div>
            </div>
        );
    }
}

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.deleteWorkspace = this.deleteWorkspace.bind(this);
    }

    deleteWorkspace() {
        const id = this.props.trip.key;
        fetch(`/api/workspace/${id}`, {method: 'DELETE'})
            .then(() => {
                this.props.history.push('/');
            })
            .catch(() => {
                console.error("Could not delete workspace");
            });
    }
    
    renderImageElement(image) {
        return <ImageElement image={image}/>
    }

    render() {
        const imageElements = this.props.trip.images.map(image => <li
            key={image.key}>{this.renderImageElement(image)}</li>);
        return (
            <div className="timeline-container">
                <button onClick={this.deleteWorkspace}>
                    Workspace löschen
                </button>
                <FileUpload/>
                <h1>Timeline</h1>
                <ul>
                    {imageElements}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        trip: state.trip
    })
)(Timeline);
