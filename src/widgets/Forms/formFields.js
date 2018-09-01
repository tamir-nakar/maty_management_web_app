import React from 'react';
import '../../css/styles.css'

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

    const renderTemplates = (data) => {

        if(data.settings.visibility === false) // need to be hidden -> don't render
            return;

        let formTemplate = '';
        let values = data.settings;

        switch(values.element){
            case('input'):
                formTemplate =(
                    <div>
                        {showLabel(values.label,values.labelText)}
                        <input
                            {...values.config}
                            value={values.value}
                            onChange={(event) => changeHandler(event, data.id)}
                        />
                    </div>
                );
                break;
            case('textarea'):
                formTemplate =(
                    <div>
                        {showLabel(values.label,values.labelText)}
                        <textarea
                            {...values.config}
                            value={values.value}
                            onChange={(event) => changeHandler(event,data.id)}
                        />
                    </div>
                );
                break;
            case('checkbox'):
                formTemplate =(
                    <div>
                        {showLabel(values.label,values.labelText)}
                        <input
                            {...values.config}
                            value={values.value}
                            onChange={(event) => changeToggleHandler(event,data.id)}
                        />
                    </div>
                );
                break;
            case('select'):
                formTemplate =(
                    <div>
                        {showLabel(values.label,values.labelText)}
                        <select
                            value={values.value}
                            name={values.config.name}
                            onChange={(event) => changeHandler(event,data.id)}
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
            default:
                formTemplate = null;
        }
        return formTemplate;
    };

    const showLabel = (show, labelText) => {
        return show ?
            <label>{labelText}</label>
            : null
    };

    const changeHandler = (event, id) => {

        const newState = props.formData;
        newState[id].value = event.target.value;

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