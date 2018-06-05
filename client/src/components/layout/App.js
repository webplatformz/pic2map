import React from 'react';
import Header from './Header'
import Main from './Main'
import FileUpload from './FileUpload';


const App = () => (
    <div>
        <Header/>
        <Main/>
        <div>
            <h2> File upload </h2>
            <FileUpload />
        </div>
    </div>
);

export default App;