import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../pages/home/Home'
import Map from '../pages/map/Map'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/map' component={Map}/>
        </Switch>
    </main>
);

export default Main;