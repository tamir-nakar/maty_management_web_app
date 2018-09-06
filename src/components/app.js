import React from 'react';
import ServiceTypeManager from "../components/serviceTypeManager"
import Header from './header.js';
import Menu from '../components/menu'
import '../css/styles.css'

const App = () => { //functional class

    return(

        <div>
            <Menu/>
            <Header/>
            <div className="backGround_front" align="center">
                <ServiceTypeManager/>
            </div>

        </div>
    )
};

export default App;
