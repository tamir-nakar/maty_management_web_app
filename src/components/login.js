import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'

class Login extends Component {

    componentDidMount(){

        //alert(`going to render LOGIN with serverLink of : ${this.props.serverLink}`);
    }
    state = {
        formData: {
            server_link: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Bot\'s Server Link',
                hover: true,
                labelTextOnHover: 'Supply a link to your bot\'s server',
                visibility: true,
                config: {
                    name: 'type_input',
                    type: 'text',
                    placeholder: this.props.serverLink
                }
            },
        }
    };

    submitForm = () => {

        this.props.changeUrlFunc(this.state.formData.server_link.value);
        alert("Connection Established");
    };

    updateForm = (newFormData) => {

        this.setState({
            formData: newFormData
        });

    };

    render() {

        return (
            <div className="container-fluid"><br/>
                <form>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <label className="label_blue">_ </label>
                    <button type="button" className="btn btn-success" onClick={this.submitForm}>Login</button>
                </form>
                <img src={require('../images/login.png')} />
            </div>
        )
    }
}

export default Login;