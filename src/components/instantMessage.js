import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'


class InstantMessage extends Component {

    state = {
        formData: {
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
                element: 'input',
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
            responses:{
                element: 'responses',
                label:true,
                labelText: 'Responses',
                visibility: true,
                valuesArr:[{
                    messaging_type:'',
                    message:''
                }]
            }
        }
    };

    submitForm = (event) => { //todo - send JSON to remote server
        event.preventDefault();
        console.log("in submit form");

        let dataToSubmit ={};
        const form = this.state.formData;
        dataToSubmit['type'] = form.name.value;
        dataToSubmit['instant_message'] = {};
        dataToSubmit.instant_message['random'] = form.random.value;
        dataToSubmit.instant_message['date_greet'] = {};
        dataToSubmit.instant_message.date_greet['morning'] = form.dateGreet_morning.value;
        dataToSubmit.instant_message.date_greet['noon'] = form.dateGreet_noon.value;
        dataToSubmit.instant_message.date_greet['afternoon'] = form.dateGreet_afternoon.value;
        dataToSubmit.instant_message.date_greet['evening'] = form.dateGreet_evening.value;
        dataToSubmit.instant_message.date_greet['night'] = form.dateGreet_night.value;
        dataToSubmit.instant_message['response'] = form.responses.valuesArr;

        //console.log(JSON.stringify(dataToSubmit));
        fetch('https://b6e34998.ngrok.io/rule', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit)
        })

    };

    handleAddResponse = (event) => {

        const newResponse = {
            messaging_type:'RESPONSE',
            message:''
        };

        const newFormData = this.state.formData;
        newFormData.responses.valuesArr.push(newResponse);
        this.setState({
            formData: newFormData
        });
    };

    handleDeleteResponse = (event) => {

        if(this.state.formData.responses.valuesArr.length === 1)
            return;

        const newFormData = this.state.formData;
        newFormData.responses.valuesArr.pop();
        this.setState({
            formData: newFormData
        });
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
            <div className="container-fluid" align="center">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <button onClick={this.handleAddResponse} className="btn btn-success">Add Response</button>
                    <button onClick={this.handleDeleteResponse} className="btn btn-danger">Delete Response</button><br/><br/>
                    <button type="submit">Submit</button>
                </form>

            </div>
        )
    }
}

export default InstantMessage;