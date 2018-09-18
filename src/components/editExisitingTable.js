import React from 'react';
import FormFields from "../widgets/Forms/formFields";
import '../css/styles.css'
import Table from "./table";

class EditExistingTable extends React.Component {

    //happens before the first render
    componentWillMount(){

        this.fetchTables();
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
        tablesData: null,
    };

    fetchTables = () => {

        let newState = this.state;
        let optionsArr = newState.formData.tablesNames.config.options;
        //todo - use this code to fetch the json from the server
        // fetch(`${this.props.serverLink}/tables.json`)
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(myJson) {
        //         console.log(JSON.stringify(myJson));
        //     });
        //todo -------------------------------------------------------

        const json = [
            {
                "table_name": "lecturers",
                "table_cols": [
                    "fname",
                    "lname",
                    "email"
                ]
            },
            // {
            //     "table_name": "secretariat",
            //     "table_cols": [
            //         "name",
            //         "phone",
            //     ]
            // }
        ];

        newState['tablesData'] = json;

        json.map( (table,index,) => {
            // an option looks like this: {val: 'AddNewTable', text: 'Add New Table'}
            optionsArr.push({val:index, text: table.table_name});
        });


        if(newState.formData.tablesNames.config.options.length === 0)
            alert("YOUR DATABASE CONTAINS NO TABLE");
        else(newState.formData.tablesNames.value = 0); // so the table #0 will be shown

        this.setState(newState);

    };
    updateForm = (newFormData) => {

        //const newState = {...newFormData, ...extraFields}; a way to merge objevts
        this.setState({
            formData: newFormData
        });
        //console.log(this.state.formData['dateGreet'].value)
        //console.log(this.state);
    };

    // handleGenerateTable = () => {
    //
    //     const cols = this.state.formData.cols.value;
    //     let newState = this.state;
    //     newState['colsArr'] = cols.trim().split(' ');
    //     newState['numOfRows'] = this.state.formData.numOfRows.value;
    //
    //     this.setState(newState);
    // };

    renderIfneeded(){

        if(this.state.formData.tablesNames.value === ' ')
        {
            return (<p/>);
        }
        else{
            let colsArr = [];
            let theRows = [];
            let currentTable = this.state.tablesData[this.state.formData.tablesNames.value];

            //todo - use this code to fetch the cols of the current table
            // fetch(`${this.props.serverLink}/tables/${currentTable.table_name}`)
            //     .then(function(response) {
            //         return response.json();
            //     })
            //     .then(function(myJson) {
            //         console.log(JSON.stringify(myJson));
            //     });
            //todo -------------------------------------------------------
            const json_2 = [
                {
                    "fname": "גדעון",
                    "lname": "דרור",
                    "email": "gideon@mta.ac.il"
                },
                {
                    "fname": "עופר",
                    "lname": "אריאלי",
                    "email": "oarieli@mta.ac.il"
                },
                {
                    "fname": "שלומית",
                    "lname": "אריאל",
                    "email": "shlomita@mta.ac.il"
                },
                {
                    "fname": "הדר",
                    "lname": "בינסקי",
                    "email": "hbinsky@mta.ac.il"
                },
                {
                    "fname": "אמיר",
                    "lname": "קירש",
                    "email": "kirsh@mta.ac.il"
                },
            ];
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
            console.log(theRows);
            return (<Table colsArr={colsArr} theRows={theRows} numOfRows={this.state.numOfRows} tableName={currentTable.table_name} />)
        }
    };

    render() {

        //fetchTables();
        //console.log(this.state.formData.tablesNames.value);

        return (
            <div className="container-fluid">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <label className="label_blue">_ </label>
                    {/*<button type="submit" className="btn btn-success">Submit</button>*/}
                    {/*<button type="button" onClick={this.handleGenerateTable} className="btn btn-success">Generate Table</button><span>  </span>*/}
                    {/*<button type="button" onClick={this.handleDeleteResponse} className="btn btn-danger">Erase Table</button><span>  </span>*/}
                </form><br/>

                {this.renderIfneeded()}

            </div>
        )
    }
}

export default EditExistingTable;