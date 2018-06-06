import React from 'react';
import './Timeline.css'
import * as moment from 'moment';
import {connect} from "react-redux";

class ImageElement extends React.Component {
    render() {
        const date = moment(this.props.image.date);

        return (
            <div className="image-container">
                <img src="https://www.amv-mz.de/wp-content/themes/oria-child/images/placeholder.png"/>
                <div className="content">
                    <h3>{date.format('ddd, DD.MM.YYYY')}</h3>
                    <p>{this.props.image.title}</p>
                </div>
            </div>
        );
    }
}

class Timeline extends React.Component {
    
    renderImageElement(image) {
        return <ImageElement image={image}/>
    }

    render() {
        const imageElements = this.props.images.map(image => <li key={image.key}>{this.renderImageElement(image)}</li>);
        return (
            <div className="timeline-container">
                <h1>Timeline</h1>
                <ul>
                    {imageElements}
                </ul>
            </div>
        );
    }
}

function mapsStateToProps(state) {
    return {
        images: state.trip.images
    };
}

export default connect(mapsStateToProps)(Timeline);
