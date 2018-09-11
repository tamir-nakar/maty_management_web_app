import { bubble as Menu } from 'react-burger-menu'
import React, { Component} from 'react';
import '../css/menu.css'
import ServiceTypeManager from "./serviceTypeManager";

class BurgerMenu extends Component {

    static showSettings (event) {

        event.preventDefault();

    }

    render () {

        return (
            <Menu>
                <span style={{fontSize: '20px', 'color' : '#aa9bff'}}> MENU </span><br />
                <a id="home" className="menu-item" href="/">Home</a><hr/>
                <a id="responses" className="menu-item" href="/" onClick={()=>{this.props.changeSubjectFunc('<ServiceTypeManager/>')}}>Rules</a><hr/>
                <a id="DataBase" className="menu-item" onClick={() => this.props.changeSubjectFunc('external_service')} href="javascript: void(0)">Data Management</a><hr/>
                <a onClick={ Menu.showSettings } className="menu-item--small" href="">Logout</a>
            </Menu>
        );
    }
}

export default BurgerMenu;