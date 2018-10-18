import React from 'react';
import FormFields from "../../widgets/Forms/formFields";
import '../../css/styles.css'
import Table from "./table";

class EditExistingTable extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.invokeFetchTables = true;
        fetch(`${this.props.serverLink}/table`, {method: 'GET'})
            .then( (response) => {return response.json()})
            .catch( () => {alert(`Unexpected error. Please Verify your connection to the bot's server (in 'Login' section).`) ;this.invokeFetchTables = false})
            .then( (myJson) => {this.state = {

                formData: {
                    tablesNames: {
                        element: 'select',
                        value: '',
                        label: true,
                        labelText: 'Table Name',
                        hover: true,
                        labelTextOnHover: 'Select a table you wish to edit',
                        visibility: true,
                        config: {
                            name: 'table_name_input',
                            options: []
                        }
                    },
                },
                colsArr: null,
                numOfRows: null,
                tablesData: myJson,
            };

                this.counter = 1;
                if(this.invokeFetchTables)
                    this.fetchTables();
            });
    }

    state = {
        formData: {
            tablesNames: {
                element: 'select',
                value: '',
                label: true,
                labelText: 'Table Name',
                hover: true,
                labelTextOnHover: 'Select a table you wish to edit',
                visibility: true,
                config: {
                    name: 'table_name_input',
                    options: []
                }
            },
        },
        colsArr: null,
        numOfRows: null,
        //tablesData: null,
        tableToRender: <p/>
    };

    fetchTables = () => {

        let newState = this.state;
        let optionsArr = newState.formData.tablesNames.config.options;


        this.state.tablesData.map( (table,index,) => {
            // an option looks like this: {val: 'AddNewTable', text: 'Add New Table'}
            console.log(`pushing ${table.table_name}`);
            optionsArr.push({val:index, text: table.table_name});
        });

        if(newState.formData.tablesNames.config.options.length === 0)
            alert("YOUR DATABASE CONTAINS NO TABLES");
        else(newState.formData.tablesNames.value = 0); // so the table #0 will be shown

        this.setState(newState);

    };

    updateForm = (newFormData) => {

        let newState = this.state;
        newState.formData = newFormData;

        if(newState.tablesData === null ||
            newState.tablesData === undefined ||
            newState.formData.tablesNames.value === ' ')
        {
            newState.tableToRender = (<p/>);
        }
        else{
            let colsArr = [];
            let theRows = [];
            let currentTable = newState.tablesData[newState.formData.tablesNames.value];

            fetch(`${this.props.serverLink}/table/${currentTable.table_name}`, {method: 'GET'})
                .then((response) => {return response.json();})
                .then((myJson) => {
                    const json_2 = myJson;
                    let current_row_to_push = {};
                    let index = 0;
                    currentTable.table_cols.map( (col) => { colsArr.push(col) });
                    json_2.map( (row) => { //foreach row
                        Object.keys(row).map((key) =>{ //foreach key
                            current_row_to_push[index] = row[key];
                            index++
                        });
                        theRows.push(current_row_to_push);
                        index=0;
                        current_row_to_push ={};
                    });
                    console.log("TABLE colsArr");
                    console.log(colsArr);
                    console.log("TABLE rows:");
                    console.log(theRows);
                    console.log("TABLE numOfRows");
                    console.log(theRows.length);
                    newState.tableToRender = (<Table colsArr={colsArr} theRows={theRows} numOfRows={theRows.length} tableName={currentTable.table_name} serverLink={this.props.serverLink} key={this.counter}/>);
                    this.setState(newState);
                });
        }
    };

    render() {

        console.log(`IN render #${this.counter++} the tablesData is:`);

        return (
            <div className="container-fluid">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <label className="label_blue">_ </label>
                </form><br/>

                {this.state.tableToRender}

            </div>
        )
    }
}

export default EditExistingTable;