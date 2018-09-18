import React from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'
import Table from "./table";

class AddNewTable extends React.Component {

    state = {
        formData: {
            tableName: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Table Name',
                hover: true,
                labelTextOnHover: 'Give a name for your new table',
                visibility: true,
                config: {
                    name: 'table_name_input',
                    type: 'text',
                    placeholder: ''
                }
            },
            cols: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Columns List',
                hover: true,
                labelTextOnHover: 'Specify your columns list for the DB-table. separated by spaces',
                visibility: true,
                config: {
                    name: 'cols_input',
                    type: 'text',
                    placeholder: 'e.g: name address phone'
                }
            },
            numOfRows: {
                element: 'input',
                value: '',
                label: true,
                labelText: '# of Rows',
                hover: true,
                labelTextOnHover: 'specify your desired number of rows',
                visibility: true,
                config: {
                    name: 'rows_input',
                    type: 'text',
                    placeholder: ''
                }
            },
        },
        colsArr: null,
        numOfRows: null,
    };

    updateForm = (newFormData) => {

        //const newState = {...newFormData, ...extraFields}; a way to merge objevts
        this.setState({
            formData: newFormData
        });
        //console.log(this.state.formData['dateGreet'].value)
        //console.log(this.state);
    };

    handleGenerateTable = () => {

        const cols = this.state.formData.cols.value;
        let newState = this.state;
        newState['colsArr'] = cols.trim().split(' ');
        newState['numOfRows'] = this.state.formData.numOfRows.value;

        this.setState(newState);
    };

    renderIfneeded(){
        console.log(this.state.colsArr);
        if(this.state.colsArr === null || this.state.numOfRows === null)
        {
            return (<p/>);
        }
        else return (<Table colsArr={this.state.colsArr} numOfRows={this.state.numOfRows} tableName={this.state.formData.tableName.value}/>)

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
                    {/*<button type="submit" className="btn btn-success">Submit</button>*/}
                    <button type="button" onClick={this.handleGenerateTable} className="btn btn-success">Generate Table</button><span>  </span>
                    <button type="button" onClick={this.handleDeleteResponse} className="btn btn-danger">Erase Table</button><span>  </span>
                </form><br/>

                {this.renderIfneeded()}
            </div>
        )
    }
}

export default AddNewTable;