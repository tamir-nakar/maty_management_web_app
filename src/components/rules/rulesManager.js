import React from 'react';
import '../../css/styles.css';
import FormFields from "../../widgets/Forms/formFields";
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
                chosenComponent = <InstantMessage serverLink={this.props.serverLink}/> ;
                break;
            case('ExternalService'):
                chosenComponent = <ExternalService serverLink={this.props.serverLink}/> ;
                break;
            case('Recipe'):
                chosenComponent = <Recipe serverLink={this.props.serverLink}/> ;
                break;
            default:
                chosenComponent = null;
        }

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
                {this.getComponent()}
                <img src={require("../../images/rules.png")} />
            </div>
        )
    }
}
export default RulesManager;