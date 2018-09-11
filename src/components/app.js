import React, {Component} from 'react';
import ServiceTypeManager from "../components/serviceTypeManager"
import Header from './header.js';
import Menu from '../components/menu'
import '../css/styles.css'
import ExternalService from "./externalService";



class App extends Component {

    state = {
        subject: <ServiceTypeManager/>,
    };

    changeSubject = (newSubject) => {

        switch(newSubject) {
            case('external_service'):
                newSubject = <ExternalService/>;
                break;
            // case('ExternalService'):
            //     newSubject = <ExternalService/> ;
            //     break;
            // case('Recipe'):
            //     newSubject = <Recipe/> ;
            //     break;
            default:
                newSubject = null;
        }

                console.log("going to change state to:" + newSubject);

                this.setState({
                    subject : newSubject
                });
        
    };


    render() {
        return (
            <div>
                <Menu changeSubjectFunc={this.changeSubject}/>
                <Header/>
                <div className="backGround_front" align="center">
                    {this.state.subject}

                </div>

            </div>
        )
    }

}


export default App;
