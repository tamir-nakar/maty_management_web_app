import React from 'react';
import '../css/styles.css';
import FormFields from "../widgets/Forms/formFields";
import InstantMessage from "./instantMessage";
import ExternalService from "./externalService";
import Recipe from "./recipe";
import AddNewTable from "./addNewTable";
import EditNewTable from "./editExisitingTable";

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

        this.setState({
            formData: newFormData
        });
    };

    getComponent() {

        let chosenComponent = null;
        switch(this.state.formData.service.value){
            case('AddNewTable'):
                chosenComponent = <AddNewTable/> ;
                break;
            case('EditExistingTable'):
                chosenComponent = <EditNewTable/> ;
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
                {this.getComponent()};
            </div>
        )
    }
}
export default TablesManager;