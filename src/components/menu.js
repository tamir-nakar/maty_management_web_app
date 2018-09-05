import { bubble as Menu } from 'react-burger-menu'
import React, { Component} from 'react';
import '../css/menu.css'

class BurgerMenu extends Component {

    static showSettings (event) {

        event.preventDefault();

    }

    render () {

        return (
            <Menu>
                <span style={{'font-size': '20px', 'color' : '#aa9bff'}}> MENU </span><br />
                <a id="home" className="menu-item" href="/">Home</a><hr/>
                <a id="responses" className="menu-item" href="/about">Rules</a><hr/>
                <a id="DataBase" className="menu-item" href="/contact">Data Management</a><hr/>
                {/*<a id ="dada" className="bm-item" href=""  style="display: block; outline: none;">*/}
                    {/*<i className="fa fa-fw fa-database"></i>*/}
                    {/*<span>Data Management</span>*/}
                {/*</a>*/}
                <a onClick={ Menu.showSettings } className="menu-item--small" href="">Logout</a>
            </Menu>
        );
    }
}

export default BurgerMenu;