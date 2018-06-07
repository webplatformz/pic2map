import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

import {getTrip} from '../../../middleware/api';
import {loadTripSuccessful} from '../../../actions/tripActions';

const UploadBox = styled.div`
  margin-top: 20px;
  background-color: white;
  outline: 2px dashed black;
  outline-offset: -2px;
  
  .dropzone-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dropzone-container div{
    width: 50%;
    text-align: center;
    
  }
  `;


class FileUpload extends Component {
    constructor() {
        super();
        this.state = {files: []};
    }

    onDrop(files) {
        this.setState({files: this.state.files.concat(files)});
        this.uploadImages(files);
    }

    uploadImages(images) {
        const formData = new FormData();
        images.forEach(image => formData.append('images', image, image.name));

        fetch(`/api/trips/${this.props.tripId}/images`, {
            method: 'POST',
            body: formData
        }).then(response => {
                if (response.ok) {
                    // Reload data
                    getTrip(this.props.tripId)
                        .then(response => response.json().then(this.props.loadTripSuccessful))
                        .catch(error => console.error(error));
                } else {
                    console.warn('Could not upload files');
                }
            });
    }

    render() {
        return (
            <section>
                <UploadBox>
                    <Dropzone className="dropzone-container" onDrop={this.onDrop.bind(this)}>
                        <div>Drop items here</div>
                    </Dropzone>
                </UploadBox>
            </section>
        );
    }
}

FileUpload.propTypes = {
    tripId: PropTypes.string,
    loadTripSuccessful: PropTypes.func.isRequired
};

export default connect(
    state => ({
        tripId: state.trip.tripId
    }),
    {loadTripSuccessful}
)(FileUpload);