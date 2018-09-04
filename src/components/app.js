import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import ServiceTypeManager from "../components/serviceTypeManager"
import Header from './header.js';
import '../css/styles.css'
import InstantMessage from "./instantMessage";

const App = () => { //functional class

    return(
        <div>
            <Header/>
            <ServiceTypeManager/>
        </div>
    )
};

export default App;
