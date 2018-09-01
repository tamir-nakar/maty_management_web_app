import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'
import '../css/respond.css'

class Respond extends Component {


    render() {
        return (
            <div className="container">
                <label>Response #{this.props.id +1 }</label>
                <input
                    name='messaging_type'
                    value={this.props.messaging_type_val}
                    type ='text'
                    onChange={(event) => this.props.changeFunc(event, this.props.id, 'messaging_type')}
                    //onChange={this.props.changeFunc}
                />
                <input
                    name='message'
                    value={this.props.message_val}
                    type ='text'
                    onChange={(event) => this.props.changeFunc(event, this.props.id, 'message')}
                    //onChange={(event) => changeHandler(event, data.id)}
                />
                <button className='floatRight'>delete</button>

            </div>

        )
    }
}
export default Respond;