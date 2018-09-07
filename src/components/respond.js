import React, { Component} from 'react';
import '../css/styles.css'
import '../css/respond.css'

class Respond extends Component {

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
                    //onChange={(event) => this.respondChangeHandler(event, i, 'message')}
                    onChange={(event) => this.props.changeFunc(event, i, 'message')}
                />
            </div>
        ));
        return ( <div>
                {inputs}
                <button type="button" onClick={this.handleAddResponse} className="btn btn-info">Add Response</button><span>  </span>
                <button type="button" onClick={this.handleDeleteResponse} className="btn btn-info">Remove Response</button><br/><br/>
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