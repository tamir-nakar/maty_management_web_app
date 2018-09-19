import React from 'react';
import '../../css/styles.css';
import FormFields from "../../widgets/Forms/formFields";
import InstantMessage from "../rules/instantMessage";
import ExternalService from "../rules/externalService";
import Recipe from "../rules/recipe";
import AddNewTable from "./addNewTable";
import EditExistingTable from "./editExisitingTable";

class TablesManager extends React.Component {

    state = {
        formData: {
            service: {
                element: 'select',
                value: 'AddNewTable',
                label: true,
                labelText: 'Type of service',
                visibility: true,
                config: {
                    name: 'service_type_input',
                    options: [
                        {val: 'AddNewTable', text: 'Add New Table'},
                        {val: 'EditExistingTable', text: 'Edit Existing Table'},
                    ]
                }
            }
        }
    };

    updateForm = (newFormData) => {

        // console.log(newFormData);
        // let newState = this.state;
        // newState.formData.service.value = newFormData;
        // this.setState(newState);
        this.setState({
            formData: newFormData
        });
    };


    getComponent() {

        let chosenComponent = null;
        switch(this.state.formData.service.value){
            case('AddNewTable'):
                chosenComponent = <AddNewTable serverLink={this.props.serverLink}/> ;
                break;
            case('EditExistingTable'):
                chosenComponent = <EditExistingTable serverLink={this.props.serverLink}/> ;
                break;
            default:
                chosenComponent = null;
        }

        return(<div className="fadeinDown">{chosenComponent}</div> );
    }



    render() {

        console.log(`rendering: ${this.state.formData.service.value}`)
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
                <img src={require("../../images/db.png")} />
            </div>
        )
    }
}
export default TablesManager;