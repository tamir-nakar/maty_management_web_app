import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'

class Recipe extends Component {

    state = {
        formData: {
            name: { //type of the service (also the name of the JSON) e.i : greeting,
                element: 'input',
                value: '',
                label: true,
                labelText: 'Service Name',
                hover: true,
                labelTextOnHover: 'Choose a name for your Recipe service',
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
                labelText: 'Random Answer',
                hover: true,
                labelTextOnHover: "Enable/Disable Random Answer feature. When enabled " +
                    "your service will always choose ONE random response \n to send back from the" +
                    " responses list below.",
                visibility: true,
                config: {
                    name: 'random_checkbox',
                    type: 'checkbox'
                }
            },
            not_found:{
                element: 'responses',
                label:true,
                labelText: 'Responses List',
                hover: true,
                labelTextOnHover: 'Specify Messages that will appear in case of unknown argument',
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

    handleAddResponse = () => {

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
            <div className="container-fluid">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <button type="button" onClick={this.handleAddResponse} className="btn btn-info">Add Response</button><span> </span>
                    <button type="button" onClick={this.handleDeleteResponse} className="btn btn-info">Remove Response</button><br/><br/>
                    <label className="label_blue">_ </label>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}

export default Recipe;