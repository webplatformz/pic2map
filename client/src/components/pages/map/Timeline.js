import React from 'react';
import './Timeline.css'

export class ImageElement extends React.Component {
    render() {
        return (
            <div className="image-container">
                <img src="https://www.amv-mz.de/wp-content/themes/oria-child/images/placeholder.png"/>
                <div className="content">
                    <h3>Do, 20.08.2018</h3>
                    <p>Elefant im Zoo</p>
                </div>
            </div>
        );
    }
}

export class Timeline extends React.Component {
    render() {
        return (
            <div className="timeline-container">
                <h1>Timeline</h1>
                <ul>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                    <li><ImageElement/></li>
                </ul>
            </div>
        );
    }
}
