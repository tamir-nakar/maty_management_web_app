import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import Header from './header.js';
import '../css/styles.css'
import InstantMessage from "./instantMessage";

const App = () => { //functional class

    return(
        <div>
            <Header/>
            <InstantMessage/>
        </div>
    )
};

export default App;
