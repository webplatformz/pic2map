import React from 'react';
import ReactDOM from 'react-dom';
import TripCreator from './TripCreator';

describe('TripCreator', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TripCreator/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

