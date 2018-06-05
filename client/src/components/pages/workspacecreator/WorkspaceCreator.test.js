import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceCreator from './WorkspaceCreator';

describe('WorkspaceCreator', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<WorkspaceCreator/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

