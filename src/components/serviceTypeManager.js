import React from 'react';
import '../css/styles.css'
import FormFields from "../widgets/Forms/formFields";
import InstantMessage from "./instantMessage";
import Respond from "./respond";

class ServiceTypeManager extends React.Component {

    state = {
        formData: {
            service: {
                element: 'select',
                value: 'InstantMessage',
                label: true,
                labelText: 'Type of service',
                visibility: true,
                config: {
                    name: 'service_type_input',
                    options: [
                        {val: 'InstantMessage', text: 'Instant Message'},
                        {val: 'ExternalService', text: 'External Service'},
                        {val: 'Recipe', text: 'Recipe'}
                    ]
                }
            }
        }
    };

    updateForm = (newFormData) => {


        this.setState({
            formData: newFormData
        });

        console.log(this.state.formData.service);

    };

    getComponent(props) {

        let retVal = null;
        switch(this.state.formData.service.value){
            case('InstantMessage'):
                retVal = <InstantMessage/> ;
                break;
            case('ExternalService'):
                retVal = <InstantMessage/> ;
                break;
            case('Recipe'):
                retVal = <InstantMessage/> ;
                break;
            default:
                retVal = null;
        }

        return retVal;
    }

    render() {
        return (
            <div className="container" align="center">
                <form>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />

                </form>
                {this.getComponent()};
            </div>
        )
    }
}
export default ServiceTypeManager;