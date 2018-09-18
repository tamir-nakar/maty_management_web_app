import React, { Component} from 'react';
import FormFields from "../../widgets/Forms/formFields";
import '../../css/styles.css'

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

    toggleArgumentHidden = (argIndex) => {

        const newFormData = this.state.formData;

        newFormData['Arguments']['argumentsArr'][argIndex]['hidden']=
            !this.state.formData['Arguments']['argumentsArr'][argIndex]['hidden'];

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
                    hidden: false,
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
                toggleHiddenFunc:this.toggleArgumentHidden,
            },

        }
    };

    submitForm = (event) => { //todo - send JSON to remote server
        event.preventDefault();

        let dataToSubmit ={};
        const form = this.state.formData;



        dataToSubmit['type'] = form.nameOfService.value;
        dataToSubmit['recipe'] = {};
        dataToSubmit.recipe['arguments'] = {};
        // noinspection JSAnnotator
        dataToSubmit.recipe.arguments['not_found'] ={};
        // noinspection JSAnnotator
        dataToSubmit.recipe.arguments.not_found['instant_message']={};
        // noinspection JSAnnotator
        dataToSubmit.recipe.arguments.not_found.instant_message['random']=form.not_found.random;
        // noinspection JSAnnotator
        dataToSubmit.recipe.arguments.not_found.instant_message['response']=form.not_found.valuesArr;

        form.Arguments.argumentsArr.map( (arg, i) => {

            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name] = {};

            if(arg.toSplit !== ''){
                // noinspection JSAnnotator
                dataToSubmit.recipe.arguments[arg.name]['to_split'] = parseInt(arg.toSplit);
                // noinspection JSAnnotator
                dataToSubmit.recipe.arguments[arg.name]['not_match'] = {};
                // noinspection JSAnnotator
                dataToSubmit.recipe.arguments[arg.name]['not_match']['instant_message'] ={};
                // noinspection JSAnnotator
                dataToSubmit.recipe.arguments[arg.name]['not_match']['instant_message']['random'] =arg.split_random;
                // noinspection JSAnnotator
                dataToSubmit.recipe.arguments[arg.name]['not_match']['instant_message']['response'] =arg.split_faild_responses;
            }
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match'] = {};
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['query'] = arg.query;
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['empty_result'] = {};
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['empty_result']['instant_message'] = {};
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['empty_result']['instant_message']['random'] =arg.query_failed_random;
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['empty_result']['instant_message']['response'] =arg.query_faild_responses;
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['instant_message'] = {};
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['instant_message']['random'] = arg.query_success_random;
            // noinspection JSAnnotator
            dataToSubmit.recipe.arguments[arg.name]['match']['instant_message']['response'] = arg.query_success_responses;
        });



        console.log(JSON.stringify(dataToSubmit));
        fetch(`${this.props.serverLink}/rule`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit)
        })

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