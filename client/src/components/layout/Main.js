import React from 'react'
import {Route, Switch} from 'react-router-dom'
import WorkspaceCreator from '../pages/workspacecreator/WorkspaceCreator'
import Workspace from '../pages/workspace/Workspace'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={WorkspaceCreator}/>
            <Route path='/workspace/:id' component={Workspace}/>
        </Switch>
    </main>
);

export default Main;