import React, { Component} from 'react';
import '../css/styles.css'
import '../css/respond.css'
import ReactTooltip from "react-tooltip";

class Respond extends Component {

    handleRandomClicked =() => {
        this.props.randomToggleFunc(this.props.elementName);
        this.props.changeFunc('event',-1,'message')
    };
    handleAddResponse = () => {

        const newResponse = {
            messaging_type:'RESPONSE',
            message:''
        };

        this.props.arr.push(newResponse);
        this.props.changeFunc('event', -1, 'message');
    };

    handleDeleteResponse = () => {

        if(this.props.arr.length === 1)
            return;

        const newArr = this.props.arr;
        newArr.pop();
        this.props.changeFunc('event', -1, 'message');
    };

    render() {

        const inputs = this.props.arr.map((item, i) =>(
            <div key={i} className={i === 0 ? "none" : "fadeinDown"}>
                <label>Response #{i +1}</label>
                <input
                    name='message'
                    value={item.message}
                    type ='text'
                    onChange={(event) => this.props.changeFunc(event, i, 'message')}
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

// render(props) {
//
//     console.log(props.arr);
//     const inputs = props.responses_Arr.map((item, i) =>(
//         <div key={i} className={i === 0 ? "none" : "fadeinDown"}>
//             <label>Response #{i +1}</label>
//             <input
//                 name='message'
//                 value={this.state.message}
//                 type ='text'
//                 onChange={(event) => this.respondChangeHandler(event, i, 'message')}
//             />
//         </div>
//     ));
//     return ( <div ref = {this.myRef}>
//             {inputs}
//             <button type="button" onClick={this.handleAddResponse} className="btn btn-info">Add Response</button><span> </span>
//             <button type="button" onClick={this.handleDeleteResponse} className="btn btn-info">Remove Response</button><br/><br/>
//         </div>
//     )
// }
// }