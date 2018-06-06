import React from 'react'

export default class WorkspaceCreator extends React.Component {

    componentDidMount() {
        this.createAndForwardToNewWorkspace();
    }

    createAndForwardToNewWorkspace() {
        fetch('/api/workspace', {method: 'POST'})
            .then((res) => {
                res.json()
                    .then((res) => {
                        this.forwardToWorkspace(res.id)
                    })
                    .catch(() => {
                        console.error("Could not parse response");
                    })
            })
            .catch(() => {
                console.error("Could not generate new workspace");
            });
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