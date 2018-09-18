import React, {Component} from 'react';
import RulesManager from "./rulesManager"
import Header from './header.js';
import Menu from '../components/menu'
import '../css/styles.css'
import TablesManager from "./tablesManager";
import Login from "./login";
import Train from "./train";

class App extends Component {

    changeLinkField =(newVal) => {
        console.log(`changelinkField got the val of ${newVal}`);
        let newState = this.state;
        newState['link'] = newVal;
        newState['subject'] = <Login changeUrlFunc={this.changeLinkField} serverLink={newVal}/>;
        this.setState(newState);
    };
    //triggered by clicking on the menu.
    changeSubject = (newSubject) => {


        //alert("in changing subject: newSubject is--- " + newSubject + " serverLink is --- "+ serverLink);
        switch(newSubject) {
            case('login'):
                newSubject = <Login changeUrlFunc={this.changeLinkField} serverLink={this.state.link}/>;
                break;
            case('rules'):
                newSubject = <RulesManager serverLink={this.state.link}/>;
                break;
            case('data_management'):
                newSubject = <TablesManager serverLink={this.state.link}/>;
                break;
            case('train'):
                newSubject = <Train serverLink={this.state.link}/>;
                break;
            default:
                newSubject = null;
        }

        this.setState({
            subject : newSubject,
        });

    };

    state = {

        subject: <Login changeUrlFunc={this.changeLinkField} />,
        link: null
    };




    render() {
        //console.log(`app was rendered with link: ${this.state.link}`);
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
