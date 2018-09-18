import React from 'react';
import '../css/styles.css';
import FormFields from "../widgets/Forms/formFields";
import InstantMessage from "./instantMessage";
import ExternalService from "./externalService";
import Recipe from "./recipe";

class RulesManager extends React.Component {

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
    };

    getComponent() {

        let chosenComponent = null;
        switch(this.state.formData.service.value){
            case('InstantMessage'):
                chosenComponent = <InstantMessage/> ;
                break;
            case('ExternalService'):
                chosenComponent = <ExternalService/> ;
                break;
            case('Recipe'):
                chosenComponent = <Recipe/> ;
                break;
            default:
                chosenComponent = null;
        }

        console.log("rendered");
        return(<div className="fadeinDown">{chosenComponent}</div> );
    }



    render() {

        const specific = {
            background:'rgb(162, 183, 182)',
            color: 'white'
        };

        return (
            <div className="container" >
                <form style={specific}>
                    <FormFields
                                formData={this.state.formData}
                                change={(newState) => this.updateForm(newState)}
                    />

                </form><br/>
                {this.getComponent()};
            </div>
        )
    }
}
export default RulesManager;