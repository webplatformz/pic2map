import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl';
import {Timeline} from './Timeline';
import FileUpload from './FileUpload';

const MapBox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWxlaW1lciIsImEiOiJjamkxY2t1M3owamlkM3BwaWhndGVpM2pzIn0.zUGWyylw3BKCaBRQUN2LXQ'
});

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.deleteWorkspace = this.deleteWorkspace.bind(this);
    }

    deleteWorkspace() {
        const id = this.props.match.params.id;
        fetch(`/api/workspace/${id}`, {method: 'DELETE'})
            .then(() => {
                alert('Workspace deleted');
            })
            .catch(() => {
                console.error("Could not delete workspace");
            });
    }

    render() {
        return (
            <div>
                <MapBox // eslint-disable-next-line
                    style="mapbox://styles/mapbox/streets-v8"
                    containerStyle={{width: '100vw', height: '100vh'}}
                />
                <Timeline/>
                <div>
                    <h2> File upload </h2>
                    <FileUpload workspaceId={this.props.match.params.id}/>
                </div>
                <button onClick={this.deleteWorkspace}>
                    Workspace löschen
                </button>
            </div>
        );
    }
}

