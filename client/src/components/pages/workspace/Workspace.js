import React from 'react'
import {Map} from './Map';
import Timeline from './Timeline';
import FileUpload from './FileUpload';
import './Workspace.css';

export default class Workspace extends React.Component {

    constructor(props) {
        super(props);
        this.deleteWorkspace = this.deleteWorkspace.bind(this);
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
        return (
            <div>
                <div id="workspace-container">
                    <Map/>
                    <Timeline/>
                </div>
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

