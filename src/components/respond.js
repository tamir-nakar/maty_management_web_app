import React, { Component} from 'react';
import '../css/styles.css'
import '../css/respond.css'

class Respond extends Component {

    render() {
        let animate = "fadeinDown";
        if(this.props.id === 0)
        {
            animate = "none";
        }
        return (

            <div className={animate}>
                <label>Response #{this.props.id +1 }</label>
                <input
                    name='message'
                    value={this.props.message_val}
                    type ='text'
                    onChange={(event) => this.props.changeFunc(event, this.props.id, 'message')}
                />
            </div>

        )
    }
}
export default Respond;