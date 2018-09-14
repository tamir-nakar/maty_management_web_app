import React, {Component} from 'react';
import ServiceTypeManager from "../components/serviceTypeManager"
import Header from './header.js';
import Menu from '../components/menu'
import Table from '../components/table'
import '../css/styles.css'
import ExternalService from "./externalService";
import TableManager from "./tableManager";



class App extends Component {

    state = {
        subject: <ServiceTypeManager/>,
    };

    changeSubject = (newSubject) => {

        switch(newSubject) {
            case('external_service'):
                newSubject = <TableManager/>;
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
