import React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';

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


export default class TimelineElement extends React.Component {
    render() {
        const date = moment(this.props.image.date);

        return (
            <ImageContainer>
                <img alt="Placeholder"
                     src="https://www.amv-mz.de/wp-content/themes/oria-child/images/placeholder.png"/>
                <Content>
                    <h3>{date.format('ddd, DD.MM.YYYY')}</h3>
                    <p>{this.props.image.title}</p>
                </Content>
            </ImageContainer>
        );
    }
}
