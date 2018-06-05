import React from 'react'
import logo from '../../../assets/logo.svg';
import './Home.css'

const Home = () => (
    <div className="Home">
        <header className="Home-header">
            <img src={logo} className="Home-logo" alt="logo"/>
            <h1 className="Home-title">Welcome to React</h1>
        </header>
        <p className="Home-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
);

export default Home;