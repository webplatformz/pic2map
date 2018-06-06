import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';


class FileUpload extends Component {
    constructor() {
        super();
        this.state = { files: [] };
    }

    onDrop(files) {
        this.setState({files: this.state.files.concat(files)});
        this.uploadPictures(files);
    }

    uploadPictures(pictures) {
        const formData  = new FormData();
        pictures.forEach(picture => formData.append('pictures', picture, picture.name));

        fetch(`/api/workspace/${this.props.workspaceId}/picture`, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                // Reload data
            } else {
                console.warn('Could not upload files');
            }
        });
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>{this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}</ul>
                </aside>
            </section>
        );
    }
}

FileUpload.propTypes = {
    workspaceId: PropTypes.string.isRequired
};

export default FileUpload;
