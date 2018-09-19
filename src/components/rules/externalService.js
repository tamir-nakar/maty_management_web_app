import React, { Component} from 'react';
import FormFields from "../../widgets/Forms/formFields";
import '../../css/styles.css'

class ExternalService extends Component {

    state = {
        formData: {
            name: { //type of the service (also the name of the JSON) e.i : greeting,
                element: 'input',
                value: '',
                label: true,
                labelText: 'Service Name',
                hover: true,
                labelTextOnHover: 'Choose a name for your External service',
                visibility: true,
                config: {
                    name: 'type_input',
                    type: 'text',
                    placeholder: 'Enter name of service'
                }
            },
            url: { //type of the service (also the name of the JSON) e.i : greeting,
                element: 'input',
                value: '',
                label: true,
                labelText: 'Service Url Link',
                hover: true,
                labelTextOnHover: 'Link your service to the system. When activated, your service' +
                    ' will be initiated if available',
                visibility: true,
                config: {
                    name: 'url_input',
                    type: 'text',
                    placeholder: 'Link to your service'
                }
            }
        }
    };

    submitForm = (event) => { //todo - send JSON to remote server
        event.preventDefault();
        //console.log("in submit form");

        let dataToSubmit ={};
        const form = this.state.formData;
        dataToSubmit['type'] = form.name.value;
        dataToSubmit['service_url'] = form.url.value;

        //console.log(JSON.stringify(dataToSubmit));
        fetch(`${this.props.serverLink}/rule`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit)
        })

    };

    updateForm = (newFormData) => {

        this.setState({
            formData: newFormData
        });
    };

    render() {

        return (
            <div className="container-fluid">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <label className="label_blue">_ </label>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}

export default ExternalService;