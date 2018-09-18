import React, { Component} from 'react';
import '../../css/styles.css'
import '../../css/respond.css'
//import ReactTooltip from "react-tooltip";
import Respond from "./respond";

class Argument extends Component {

    // handleRandomClicked =() => {
    //     this.props.randomToggleFunc(this.props.elementName);
    //     this.props.changeFunc('event',-1,'message')
    // };
    handleAddArgument = () => {

        const newArgument ={

            hidden: false,
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

        const inputs = this.props.argumentsArr.map((arg, i) =>( //Foreach Argument


            <div key={i} className={i === 0 ? "none" : "fadeinDown"}>
                <label onClick={() => this.props.hiddenToggleFunc(i)} className="label_arg">Argument #{i +1}: {arg.name}</label>
                <div hidden={arg.hidden}>
                    <label>Argument Name</label>
                    <input //name
                        name='name'
                        value={arg.name}
                        type ='text'
                        placeholder='name'
                        onChange={(event) => this.props.changeFunc(event, i, 'name')}
                    />
                    <label>split value (optional)</label>
                    <input //to split
                        name='toSplit'
                        value={arg.toSplit}
                        type ='text'
                        onChange={(event) => this.props.changeFunc(event, i, 'toSplit')}
                    />
                    <label>'Split Faild' Responses List</label>
                    <Respond
                        arr={arg.split_faild_responses}
                        random={arg.split_random}
                        changeFunc = {this.props.respondsChangeFunc}
                        randomToggleFunc = {this.props.randomToggleFunc}
                        parentArgumentName='split_faild_responses'
                        parentIndex = {i}
                    /><br/>
                    <label>Query</label>
                    <input //query
                        name='query'
                        value={arg.query}
                        type ='text'
                        onChange={(event) => this.props.changeFunc(event, i, 'query')}
                    />
                    <label>Query Succeeded Responds List</label>
                    <Respond
                        arr={arg.query_success_responses}
                        random={arg.query_success_random}
                        changeFunc = {this.props.respondsChangeFunc}
                        randomToggleFunc = {this.props.randomToggleFunc}
                        parentArgumentName='query_success_responses'
                        parentIndex = {i}
                    /><br/>
                    <label>Query Failed Responds List</label>
                    <Respond
                        arr={arg.query_faild_responses}
                        random={arg.query_failed_random}
                        changeFunc = {this.props.respondsChangeFunc}
                        randomToggleFunc = {this.props.randomToggleFunc}
                        parentArgumentName='query_faild_responses'
                        parentIndex = {i}
                    /><br/>
                </div>
            </div>
        ));
        return (
            <div>
                {inputs}
                <label>_</label>
                <button type="button" onClick={this.handleAddArgument} className="btn btn-success">Add Argument</button><span>  </span>
                <button type="button" onClick={this.handleDeleteArgument} className="btn btn-danger">Remove Argument</button>
            </div>
        )
    }
}
export default Argument;

