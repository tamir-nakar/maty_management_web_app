import React from 'react';
import Respond from '../../components/respond';
import '../../css/styles.css';
import ReactTooltip from 'react-tooltip'


const FormFields = (props) => { //functional class

    const renderFields = () => {

        const formArray =[];

        for(let element in props.formData){
            formArray.push({
                id:element,
                settings: props.formData[element]
            })
        }

        return formArray.map( (item,i) => {
            return(
                <div key={i} className="form_element">
                    {renderTemplates(item)}
                </div>
            )
        })
    };

    const renderTemplates = (itemToBeRendered) => {

        if(itemToBeRendered.settings.visibility === false) // need to be hidden -> don't render
            return;

        let formTemplate = '';
        let values = itemToBeRendered.settings;

        switch(values.element){
            case('input'):
                formTemplate =(
                    <div className={values.animate === true? "fadeinDown" : "none"}>

                        {createLabel(values.label, values.labelText, values.hover, values.labelTextOnHover , values.config.name)}
                        <input
                            {...values.config}
                            value={values.value}
                            onChange={(event) => changeHandler(event, itemToBeRendered.id)}
                        />
                    </div>
                );
                break;
            case('textarea'):
                formTemplate =(
                    <div>
                        {createLabel(values.label, values.labelText, values.hover, values.labelTextOnHover , values.config.name)}
                        <textarea
                            {...values.config}
                            value={values.value}
                            onChange={(event) => changeHandler(event,itemToBeRendered.id)}
                        />
                    </div>
                );
                break;
            case('checkbox'):
                formTemplate =(
                    <div>
                        {createLabel(values.label, values.labelText, values.hover, values.labelTextOnHover , values.config.name)}
                        <input
                            {...values.config}
                            value={values.value}
                            onChange={(event) => changeToggleHandler(event,itemToBeRendered.id)}
                        />
                    </div>
                );
                break;
            case('select'):
                formTemplate =(
                    <div>
                        {createLabel(values.label, values.labelText, values.hover, values.labelTextOnHover , values.config.name)}
                        <select className="form-control"
                                value={values.value}
                                name={values.config.name}
                                onChange={(event) => changeHandler(event,itemToBeRendered.id)}
                        >
                            {values.config.options.map((item,i) =>(
                                <option key={i} value={item.val}>
                                    {item.text}
                                </option>
                            ))}

                        </select>
                    </div>
                );
                break;
            case('responses'):
                formTemplate =(
                    <div>
                        {createLabel(values.label, values.labelText, values.hover, values.labelTextOnHover , 'responses_List_id')}
                            <Respond
                                arr={values.valuesArr}
                                random={values.random}
                                changeFunc = {respondChangeHandler}
                                randomToggleFunc = {values.changeRandomFunc}
                                elementName = {itemToBeRendered.id}
                            />
                    </div>
                );
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    };

    const createLabel = (label, labelText, hover, OnHoverText, key) => {


        if(label){
            if(hover){
                return(
                    <div>
                        <a data-tip data-for={key}>  <label>{labelText}</label></a>
                        <ReactTooltip id={key} type='info'>
                            <p className="toolkit_info">{OnHoverText}</p>
                        </ReactTooltip>
                    </div>
                )
            }
            else return <label>{labelText}</label>
        }
        return null
    };

    const changeHandler = (event, id) => {

        const newState = props.formData;
        newState[id].value = event.target.value;
        //console.log("i gonna change "+ id.toString() + " text box to " + event.target.value);
        props.change(newState);
    };

    const respondChangeHandler = (event, index, name) =>{
        // -1 means we just want the render (no update to state)
        const newState = props.formData;
        if(index !== -1){
            newState['responses'].valuesArr[index][name]= event.target.value;
            //console.log("i gonna change "+ id.toString() + " text box to " + event.target.value);
        }

        props.change(newState);

    };

    const changeToggleHandler =(event, id) => {

        const newState = props.formData;

        newState[id].value = !props.formData[id].value;

        props.change(newState);
    };

    return(
        <div>{renderFields()}</div>
    )
};

export default FormFields;