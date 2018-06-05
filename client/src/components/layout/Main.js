import React from 'react'
import {Route, Switch} from 'react-router-dom'
import WorkspaceCreator from '../pages/home/WorkspaceCreator'
import Map from '../pages/map/Map'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={WorkspaceCreator}/>
            <Route path='/map' component={Map}/>
        </Switch>
    </main>
);

export default Main;