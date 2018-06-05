import React from 'react'

export default class WorkspaceCreator extends React.Component {

    componentDidMount() {
        this.createAndForwardToNewWorkspace();
    }

    createAndForwardToNewWorkspace() {
        // TODO fix fetch url and create ID on server
        /* fetch('https://randomuser.me/api/')
             .then(({workspaceId}) => forwardToWorkspace(workspaceId));*/
        setTimeout(() => {
            this.forwardToWorkspace('test')
        }, 3000);
    }

    forwardToWorkspace(workspaceId) {
        this.props.history.push(`/map/${workspaceId}`)
    }

    render() {
        return (
            <div>
                Please wait, while we are generating your new workspace...
            </div>
        );
    }
}