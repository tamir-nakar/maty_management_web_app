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
                visibility: true,
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
                visibility: true,
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
                visibility: true,
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
                visibility: true,
                config: {
                    name: 'date_greet_checkbox',
                    type: 'checkbox'
                }
            },
            //visible only when dateGreet checkbox is selected
            //-------------------------------------------------
            dateGreet_morning: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Morning',
                visibility: false,
                config: {
                    name: 'dateGreet_morning_input',
                    type: 'text'
                }
            },
            dateGreet_noon: {
                element: 'Noon',
                value: '',
                label: true,
                labelText: 'Noon',
                visibility: false,
                config: {
                    name: 'dateGreet_noon_input',
                    type: 'text'
                }
            },
            dateGreet_afternoon: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Afternoon',
                visibility: false,
                config: {
                    name: 'dateGreet_afternoon_input',
                    type: 'text'
                }
            },
            dateGreet_evening: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Evening',
                visibility: false,
                config: {
                    name: 'dateGreet_evening_input',
                    type: 'text'
                }
            },
            dateGreet_night: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Night',
                visibility: false,
                config: {
                    name: 'dateGreet_night_input',
                    type: 'text'
                }
            },
            //-------------------------------------------------
            db: {
                element: 'textarea',
                value: '',
                label: false,
                labelText: 'db',
                visibility: false,
                config: {
                    name: 'db_input',
                    rows: 4,
                    cols: 36
                }
            },
            responses:{
                element: 'responses',
                label:true,
                labelText: 'Responses',
                visibility: true,
                valuesArr:[{
                    messaging_type:'dada',
                    message:'baba'
                }]
            }
        }
    };

    submitForm = (event) => { //todo - send JSON to remote server
        event.preventDefault();

        let dataToSubmit = {};
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }
        //console.log(dataToSubmit);
        //axios.post(url,dataToSubmit)
    };

    updateForm = (newFormData) => {

        const showOrHideDateGreetOptions = newFormData['dateGreet'].value;
        for(let field in newFormData){
            if(/dateGreet_.*/.test(field.toString())){
                newFormData[field].visibility = showOrHideDateGreetOptions;
            }
        }

        //const newState = {...newFormData, ...extraFields}; a way to merge objevts
        this.setState({
            formData: newFormData
        });
        //console.log(this.state.formData['dateGreet'].value)
        //console.log(this.state);
    };

    render() {
        return (
            <div className="container" align="center">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <button>Add Response</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default InstantMessage;