import React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const EditButton = styled(DeleteButton)`
    && {
      margin-top: 40px;
    }
`;


export default class TimelineElement extends React.Component {
    render() {
        const editMode = this.props.editMode;
        const date = moment(this.props.image.date);

        const editElements = editMode ? (
            <div>
                <DeleteButton variant="fab"><DeleteIcon/></DeleteButton>
                <EditButton variant="fab"><EditIcon/></EditButton>
            </div>
        ) : null;

        return (
            <ImageContainer>
                <img alt="Placeholder"
                     src="https://www.amv-mz.de/wp-content/themes/oria-child/images/placeholder.png"/>
                <Content>
                    <h3>{date.format('ddd, DD.MM.YYYY')}</h3>
                    <p>{this.props.image.title}</p>
                </Content>
                {editElements}
            </ImageContainer>
        );
    }
}

TimelineElement.propTypes = {
    editMode: PropTypes.bool
};