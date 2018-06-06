import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './components/layout/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
/*render(<App />, document.getElementById('root'));*/
registerServiceWorker();
