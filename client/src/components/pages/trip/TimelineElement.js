import React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import DeleteIcon from "@material-ui/icons/Delete";
import {API_ROOT, deleteImage, getTrip} from '../../../middleware/api';
import {connect} from "react-redux";
import {loadTripSuccessful} from "../../../actions/tripActions";

const ImageContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: [col] 150px [col] auto;
    
    img {
        grid-column: 1;
        grid-row: row;
        height: 80px;
    }
`;

const Content = styled.div`
    grid-column: 2 / 3;
    grid-row: row;
    
    h3 {
      margin: 0;
    }
    
    p {
      margin-top: 5px;
    }
`;

const DeleteButton = styled(Button)`
    && {
      position: absolute;
      right: 0;
      width: 30px;
      height: 30px;
      min-height: 30px; 
      
      svg {
       font-size: 16px;
      }
    }
`;

class TimelineElement extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteImageClick = this.onDeleteImageClick.bind(this);
    }

    onDeleteImageClick() {
        deleteImage(this.props.tripId, this.props.image.imageId)
            .then(() => {
                getTrip(this.props.tripId)
                    .then(response => response.json().then(this.props.loadTripSuccessful))
                    .catch(error => console.error(error))
            })
            .catch(() => console.error("Could not delete image"));
    }

    render() {
        const editMode = this.props.editMode;

        let date = '-';
        if (this.props.image.timestamp) {
            date = moment(this.props.image.timestamp * 1000).format('ddd, DD.MM.YYYY');
        }

        const editElements = editMode ? (
            <div>
                <DeleteButton variant="fab" onClick={this.onDeleteImageClick}><DeleteIcon/></DeleteButton>
            </div>
        ) : null;

        return (
            <ImageContainer>
                <img alt="Placeholder"
                     src={`${API_ROOT}/trips/${this.props.tripId}/images/${this.props.image.imageId}`}/>
                <Content>
                    <h3>{date}</h3>
                    <p>{this.props.image.title}</p>
                </Content>
                {editElements}
            </ImageContainer>
        );
    }
}

TimelineElement.propTypes = {
    editMode: PropTypes.bool,
    image: PropTypes.object
};

export default connect(
    state => ({
        tripId: state.trip.tripId
    }),
    {loadTripSuccessful}
)(TimelineElement);