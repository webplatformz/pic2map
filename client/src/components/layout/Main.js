import React from 'react'
import {Route, Switch} from 'react-router-dom'
import TripCreator from '../pages/tripcreator/TripCreator'
import Trip from '../pages/trip/Trip'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={TripCreator}/>
            <Route path='/trips/:tripId' component={Trip}/>
        </Switch>
    </main>
);

export default Main;