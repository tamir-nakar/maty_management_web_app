import React, { Component} from 'react';
import '../css/styles.css'
import '../css/respond.css'
import ReactTooltip from "react-tooltip";

class Respond extends Component {

    handleRandomClicked =() => {
        if(!this.props.parentArgumentName){//response is not a child of argument
            this.props.randomToggleFunc(this.props.elementName);
        }
        else{
            console.log(this.props.parentIndex);
            console.log(this.props.parentArgumentName);
            this.props.randomToggleFunc(this.props.parentIndex,this.props.parentArgumentName);
            console.log("passed it");
        }

        this.props.changeFunc('event',-1,)
    };
    handleAddResponse = () => {

        const newResponse = {
            messaging_type:'RESPONSE',
            message:''
        };

        this.props.arr.push(newResponse);
        this.props.changeFunc('event', -1);
    };

    handleDeleteResponse = () => {

        if(this.props.arr.length === 1)
            return;

        const newArr = this.props.arr;
        newArr.pop();
        this.props.changeFunc('event', -1);
    };

    render() {

        const inputs = this.props.arr.map((item, i) =>(
            <div key={i} className={i === 0 ? "none" : "fadeinDown"}>
                <label>Response #{i +1}</label>
                <input
                    name='message'
                    value={item.message}
                    type ='text'
                    onChange={this.props.parentArgumentName?
                        (event) => this.props.changeFunc(event, this.props.parentIndex, this.props.parentArgumentName, i)
                        :(event) => this.props.changeFunc(event,i, this.props.elementName)}

                />
            </div>
        ));
        return ( <div>
                {inputs}
                <button type="button" onClick={this.handleAddResponse} className="btn btn-info">Add Response</button><span>  </span>
                <button type="button" onClick={this.handleDeleteResponse} className="btn btn-info">Remove Response</button><br/><br/>

                <a data-tip data-for={this.props.elemntName}>
                    <button type="button" onClick={this.handleRandomClicked} className={this.props.random === true? "btn btn-success" : "btn btn-danger"}>Random</button>
                </a>
                <ReactTooltip id={this.props.elemntName} type='info'>
                    <p className="toolkit_info">Enable/Disable Random Answer feature. When enabled,
                        your service will always choose ONE random response from the responses list to send back</p>
                </ReactTooltip>
            </div>
        )
    }
}
export default Respond;
