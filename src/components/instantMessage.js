import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'

class InstantMessage extends Component {

    toggleReponsesElementRandom = (elementName) => {

        const newFormData = this.state.formData;
        newFormData[elementName]['random'] = !this.state.formData[elementName].random;


        this.setState({
            formData: newFormData
        });
    };

    state = {
        formData: {
            name: { //type of the service (also the name of the JSON) e.i : greeting,
                element: 'input',
                value: '',
                label: true,
                labelText: 'Service Name',
                hover: true,
                labelTextOnHover: 'Choose a name for your Instant Message service',
                visibility: true,
                config: {
                    name: 'type_input',
                    type: 'text',
                    placeholder: 'Enter name of service'
                }
            },
            dateGreet: {
                element: 'checkbox',
                value: false,
                label: true,
                labelText: 'Date Greetings',
                hover: true,
                labelTextOnHover: 'Enable/Disable Date Greetings feature. When enabled' +
                    'your service will respond the right greet according to day time. use the ' +
                    '{date_greet} tag to locate your greet inside the answer',
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
                animate: true,
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
                animate: true,
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
                animate: true,
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
                animate: true,
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
                animate: true,
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
                labelText: 'Responses List',
                hover: true,
                labelTextOnHover: 'A responses list of all your Instant Message Service. you can add/remove ' +
                    'responses clicking the appropirate buttons below',
                visibility: true,
                valuesArr:[{
                    messaging_type:'RESPONSE',
                    message:''
                }],
                random: false,
                changeRandomFunc:this.toggleReponsesElementRandom
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
        dataToSubmit.instant_message['random'] = form.responses.random;
        dataToSubmit.instant_message['date_greet'] = {};
        dataToSubmit.instant_message.date_greet['morning'] = form.dateGreet_morning.value;
        dataToSubmit.instant_message.date_greet['noon'] = form.dateGreet_noon.value;
        dataToSubmit.instant_message.date_greet['afternoon'] = form.dateGreet_afternoon.value;
        dataToSubmit.instant_message.date_greet['evening'] = form.dateGreet_evening.value;
        dataToSubmit.instant_message.date_greet['night'] = form.dateGreet_night.value;
        dataToSubmit.instant_message['response'] = form.responses.valuesArr;

        //console.log(JSON.stringify(dataToSubmit));
        console.log(dataToSubmit);
        fetch('https://b6e34998.ngrok.io/rule', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit)
        })

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

export default InstantMessage;