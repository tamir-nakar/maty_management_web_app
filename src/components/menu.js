import { bubble as Menu } from 'react-burger-menu'
import React, { Component} from 'react';
import '../css/menu.css'
import RulesManager from "./rules/rulesManager";

class BurgerMenu extends Component {

    static showSettings (event) {

        event.preventDefault();
    }


    render () {

        return (
            <Menu>
                <span style={{fontSize: '20px', 'color' : '#aa9bff'}}> MENU </span><br />
                <a id="login" className="menu-item" href="javascript: void(0)" onClick={() => this.props.changeSubjectFunc('login')}>Login</a><hr/>
                <a id="rules" className="menu-item" href="javascript: void(0)" onClick={() => this.props.changeSubjectFunc('rules')}>Rules</a><hr/>
                <a id="dataManagement" className="menu-item"  href="javascript: void(0)" onClick={() => this.props.changeSubjectFunc('data_management')}>Data Management</a><hr/>
                <a id="train" className="menu-item"  href="javascript: void(0)" onClick={() => this.props.changeSubjectFunc('train')}>Train</a><hr/>
                {/*<a onClick={ Menu.showSettings } className="menu-item--small" href="">Logout</a><hr/><br/><br/>*/}
                <a><img src={require("../images/menu.png")} /></a>
            </Menu>
        );
    }
}

export default BurgerMenu;