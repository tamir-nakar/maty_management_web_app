import React, { Component} from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'

class Recipe extends Component {

    toggleReponsesElementRandom = (elementName) => {

        const newFormData = this.state.formData;
        newFormData[elementName]['random'] = !this.state.formData[elementName].random;

        this.setState({
            formData: newFormData
        });
    };

    toggleArgumentElementRandom = (argIndex, respond_name) => {

        let name = null;
        switch(respond_name){
            case('split_faild_responses'):
                name = 'split_random';
                break;
            case('query_success_responses'):
                name = 'query_success_random';
                break;
            case('query_faild_responses'):
                name = 'query_failed_random';
                break;
            default:
                name = null;
        }

        const newFormData = this.state.formData;

        newFormData['Arguments']['argumentsArr'][argIndex][name]=
            !this.state.formData['Arguments']['argumentsArr'][argIndex][name];
        
        this.setState({
            formData: newFormData
        });

    };

    state = {
        formData: {
            nameOfService: { //type of the service (also the name of the JSON) e.i : greeting,
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
            not_found:{
                element: 'responses',
                label:true,
                labelText: '"NOT FOUND" Responses List',
                hover: true,
                labelTextOnHover: 'Specify Messages that will appear in case of unknown argument',
                visibility: true,
                valuesArr:[{
                    messaging_type:'RESPONSE',
                    message:''
                }],
                random: false,
                changeRandomFunc:this.toggleReponsesElementRandom
            },
            Arguments:{
                element: 'arguments',
                label:true,
                labelText: 'ARGUMENTS',
                hover: true,
                labelTextOnHover: 'Customise your Recipe service',
                visibility: true,
                argumentsArr:[{
                    name:'',
                    toSplit:'',
                    split_faild_responses:[{
                        messaging_type:'RESPONSE',
                        message:''
                    }],
                    split_random: false,
                    //match label
                    query:'',
                    query_success_responses:[{
                        messaging_type:'RESPONSE',
                        message:''
                    }],
                    query_success_random: false,
                    query_faild_responses:[{
                        messaging_type:'RESPONSE',
                        message:''
                    }],
                    query_failed_random: false,
                }],
                changeRandomFunc:this.toggleArgumentElementRandom,
            },

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

export default Recipe;