import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
        this.state = { files: [] };
    }

    onDrop(files) {
        this.setState({files: this.state.files.concat(files)});
        this.uploadPictures(files);
    }

    uploadPictures(pictures) {
        const formData  = new FormData();
        pictures.forEach(picture => formData.append('pictures', picture, picture.name));

        fetch(`/api/workspace/${this.props.match.params.id}/picture`, {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response.json())
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
    workspaceId: PropTypes.string.isRequired
};

export default FileUpload;
