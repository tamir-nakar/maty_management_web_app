import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'

class InstantMessage extends Component {

    state = {
        formData: {
            service: {
                element: 'select',
                value: '',
                label: true,
                labelText: 'Type of service',
                config: {
                    name: 'age_input',
                    options:[
                        {val:'1',text:'Instant Message'},
                        {val:'2',text:'External Service'},
                        {val:'3',text:'Recipe'}
                    ]
                }
            },
            name: { //type of the service (also the name of the JSON) e.i : greeting,
                element: 'input',
                value: '',
                label: true,
                labelText: 'name',
                config: {
                    name: 'type_input',
                    type: 'text',
                    placeholder: 'Enter name of service'
                }
            },
            random: {
                element: 'checkbox',
                value: false,
                label: true,
                labelText: 'Random',
                config: {
                    name: 'random_checkbox',
                    type: 'checkbox'
                }
            },
            dateGreet: {
                element: 'checkbox',
                value: false,
                label: true,
                labelText: 'date_greet',
                config: {
                    name: 'date_greet_checkbox',
                    type: 'checkbox'
                }
            },
            db: {
                element: 'textarea',
                value: '',
                label: true,
                labelText: 'db',
                config: {
                    name: 'db_input',
                    rows: 4,
                    cols: 36
                }
            },
            numOfResponses: {
                element: 'select',
                value: '1',
                label: true,
                labelText: 'Select number Of Responses',
                config: {
                    name: 'numOfResponses_input',
                    options:[
                        {val:'1',text:'1'},
                        {val:'2',text:'2'},
                        {val:'3',text:'3'},
                        {val:'4',text:'4'},
                        {val:'5',text:'5'},
                        {val:'6',text:'6'}
                    ]
                }
            },
        }
    };

    submitForm = (event) => { //todo - send JSON to remote server
        event.preventDefault();

        let dataToSubmit = {};
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }
        console.log(dataToSubmit);
        //axios.post(url,dataToSubmit)
    };

    updateForm = (newFormData) => {

        for(let field in newFormData){
            console.log('checking field: '+ field);
            if(/response_./.test(field.toString())){
                delete newFormData[field];
                console.log('success');

            }

        }
        //delete newFormData[/response_./];
        for(let i = 0; i < newFormData['numOfResponses'].value; i++){
            newFormData['response_'+i] =
                {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'response '+i,
                    config: {
                        name: 'type_input',
                        type: 'text',
                        placeholder: ''
                    }
                };
        }
        //const newState = {...newFormData, ...extraFields}; a way to merge objevts
        this.setState({
            formData: newFormData
        });
        console.log(this.state);
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default InstantMessage;