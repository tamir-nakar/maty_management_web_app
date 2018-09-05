import React, { Component} from 'react';
import ServiceTypeManager from "../components/serviceTypeManager"
import Header from './header.js';
import '../css/styles.css'

const App = () => { //functional class

    return(
        <div>
            <Header/>
            <ServiceTypeManager/>
        </div>
    )
};

export default App;
