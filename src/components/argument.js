import React, { Component} from 'react';
import '../css/styles.css'
import '../css/respond.css'
//import ReactTooltip from "react-tooltip";
import Respond from "./respond";

class Argument extends Component {

    // handleRandomClicked =() => {
    //     this.props.randomToggleFunc(this.props.elementName);
    //     this.props.changeFunc('event',-1,'message')
    // };
    handleAddArgument = () => {

        const newArgument ={

            name:'',
            toSplit:'',
            split_faild_responses:[{
                messaging_type:'RESPONSE',
                message:''
            }],
            split_random: false,
            query:'',
            query_success_responses:[{
                messaging_type:'RESPONSE',
                message:''
            }],
            query_success_random: false,
            query_faild_responses:[{
                messaging_type:'RESPONSE',
                message:''
            }],
            query_failed_random: false,
            changeRandomFunc:this.toggleArgumentElementRandom,
        };

        this.props.argumentsArr.push(newArgument);
        this.props.changeFunc('event', -1);
    };

    handleDeleteArgument = () => {

        if(this.props.argumentsArr.length === 1)
            return;

        const newArr = this.props.argumentsArr;
        newArr.pop();
        this.props.changeFunc('event', -1);
    };

    render() {

        const inputs = this.props.argumentsArr.map((item, i) =>( //Foreach Argument
            <div key={i} className={i === 0 ? "none" : "fadeinDown"}>
                <label style={{'color':'red'}}>Argument #{i +1}: {item.name}</label>
                <label>Argument Name</label>
                <input //name
                    name='name'
                    value={item.name}
                    type ='text'
                    placeholder='name'
                    onChange={(event) => this.props.changeFunc(event, i, 'name')}
                />
                <label>split value (optional)</label>
                <input //to split
                    name='toSplit'
                    value={item.toSplit}
                    type ='text'
                    onChange={(event) => this.props.changeFunc(event, i, 'toSplit')}
                />
                <label>'Split Faild' Responses List</label>
                <Respond
                    arr={item.split_faild_responses}
                    random={item.split_random}
                    changeFunc = {this.props.respondsChangeFunc}
                    randomToggleFunc = {this.props.randomToggleFunc}
                    parentArgumentName='split_faild_responses'
                    parentIndex = {i}
                /><br/>
                <label>Query</label>
                <input //query
                    name='query'
                    value={item.query}
                    type ='text'
                    onChange={(event) => this.props.changeFunc(event, i, 'query')}
                />
                <label>Query Succeeded Responds List</label>
                <Respond
                    arr={item.query_success_responses}
                    random={item.query_success_random}
                    changeFunc = {this.props.respondsChangeFunc}
                    randomToggleFunc = {this.props.randomToggleFunc}
                    parentArgumentName='query_success_responses'
                    parentIndex = {i}
                /><br/>
                <label>Query Failed Responds List</label>
                <Respond
                    arr={item.query_faild_responses}
                    random={item.query_failed_random}
                    changeFunc = {this.props.respondsChangeFunc}
                    randomToggleFunc = {this.props.randomToggleFunc}
                    parentArgumentName='query_faild_responses'
                    parentIndex = {i}
                /><br/>
            </div>
        ));
        return ( <div>
                {inputs}
                <label> _</label>
                <button type="button" onClick={this.handleAddArgument} className="btn btn-success">Add Argument</button><span>  </span>
                <button type="button" onClick={this.handleDeleteArgument} className="btn btn-danger">Remove Argument</button>

                {/*<a data-tip data-for={this.props.elemntName}>*/}
                    {/*<button type="button" onClick={this.handleRandomClicked} className={this.props.random === true? "btn btn-success" : "btn btn-danger"}>Random</button>*/}
                {/*</a>*/}
                {/*<ReactTooltip id={this.props.elemntName} type='info'>*/}
                    {/*<p className="toolkit_info">Enable/Disable Random Answer feature. When enabled,*/}
                        {/*your service will always choose ONE random response from the responses list to send back</p>*/}
                {/*</ReactTooltip>*/}
            </div>
        )
    }
}
export default Argument;

