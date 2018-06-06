import React from 'react'
import {Route, Switch} from 'react-router-dom'
import WorkspaceCreator from '../pages/workspacecreator/WorkspaceCreator'
import Map from '../pages/map/Map'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={WorkspaceCreator}/>
            <Route path='/map/:id' component={Map}/>
        </Switch>
    </main>
);

export default Main;