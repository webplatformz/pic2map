import React from 'react';
import './Timeline.css'
import * as moment from 'moment';

const mockData = [
    {key: 'a', date: '2011-10-05T14:48:00.000Z', title: 'Elefant im Zoo'},
    {key: 'b', date: '2011-01-22T14:48:00.000Z', title: 'Tiger im Zoo'},
    {key: 'c', date: '2011-11-29T14:48:00.000Z', title: 'Löwe im Zoo'},
    {key: 'd', date: '2011-12-11T14:48:00.000Z', title: 'Pinugin im Zoo'},
    {key: 'e', date: '2011-03-03T14:48:00.000Z', title: 'Pelikan im Zoo'},
    {key: 'f', date: '2011-04-16T14:48:00.000Z', title: 'Affen im Zoo'},
    {key: 'g', date: '2011-11-29T14:48:00.000Z', title: 'Löwe im Zoo'},
    {key: 'h', date: '2011-12-11T14:48:00.000Z', title: 'Pinugin im Zoo'},
    {key: 'i', date: '2011-03-03T14:48:00.000Z', title: 'Pelikan im Zoo'},
    {key: 'j', date: '2011-04-16T14:48:00.000Z', title: 'Affen im Zoo'},
];


export class ImageElement extends React.Component {
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

export class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
        };
    }

    componentDidMount() {
        this.setState({images: mockData});
    }

    renderImageElement(image) {
        return <ImageElement image={image}/>
    }

    render() {
        const imageElements = this.state.images.map(image => <li>{this.renderImageElement(image)}</li>);
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
