import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
//import ReactDataGridPlugins from 'react-data-grid/addons';
import '../../css/styles.css'

class Table extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.createCols();
        this.createRows();
    }

    createCols = () => {

        // if(this.props.theRows)
        //     return;

        let cols = [];
        this.props.colsArr.map( (colName, index) => {

            cols.push({
                key: index,
                name: colName,
                editable: true,
            })
        });

        this.colsCopy = cols;
        return cols;
    };

    createRows = () => {

        if(this.props.theRows){
            this.state.rows = this.props.theRows;
            return;
        }
        let row = {};
        let rows = [];

        for (let i = 1; i <= this.props.numOfRows; i++) {

            this.colsCopy.map((col) => {
                row[col.key.toString()] = ' ';
            });

            rows.push(row);
        }

        this.state.rows = rows;
    };

    state = {
        rows: null,
    };

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    handleAddRow = () => {
        //a row pattern:
        //{0: var, 1: "nice"}

        //const lastIDX = this.state.rows.length;
        const newRow = {};
        //newRow[lastIDX] = ' ';
        let index=0;
        this.colsCopy.map(()=>{newRow[index++]= " "});
        let newState = this.state;
        newState.rows.push(newRow);
        this.setState(newState);
    };

    handleRemoveRow = () => {


        let newState = this.state;
        newState.rows.pop();
        this.setState(newState);
    };

    handleSubmit = () => {

        let dataToSubmit_createTable ={};
        dataToSubmit_createTable['table_name'] = this.props.tableName;
        dataToSubmit_createTable['table_cols'] = this.props.colsArr;

        let dataToSubmit_supplyRows ={};
        dataToSubmit_supplyRows['table_rows'] = [];

        for (let i = 0; i < this.state.rows.length; i++) {
            // every time 1 row
            console.log(`handle row ${this.state.rows[i]}`);
            let currentRowToCpy = this.state.rows[i];

            let newRow = Object.keys(currentRowToCpy).map(function(key) {
                return currentRowToCpy[key];
            });

            dataToSubmit_supplyRows['table_rows'].push(newRow);
        }

        console.log(dataToSubmit_createTable);
        console.log(dataToSubmit_supplyRows);
        //until here we created the 2 data structures to submit

        fetch(`${this.props.serverLink}/table`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit_createTable)
        })
            .then( (response) => {
                if (response.status !== 200){
                    alert('error occoured');
                    return;
                }
                fetch(`${this.props.serverLink}/table/${this.props.tableName}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSubmit_supplyRows)
                }).then( (response2) =>{
                    if(response2.status === 200)
                        alert(`The table ${this.props.table_name} was uploaded successfully`);

                    else
                        alert(`Error please try again`);





                });
            });

    };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };

    render() {

        return  (
            <div>

                <ReactDataGrid
                    enableCellSelect={true}
                    columns={this.createCols()}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    minHeight={400}
                    onGridRowsUpdated={this.handleGridRowsUpdated}
                />

                <button type="button" onClick={this.handleAddRow} className="btn btn-info">ADD ROW</button><span>  </span>
                <button type="button" onClick={this.handleRemoveRow} className="btn btn-info">REMOVE ROW</button><span>  </span>
                <button type="button" onClick={this.handleSubmit} className="btn btn-success">SUBMIT TABLE</button>


            </div>

        );
    }
}

export default Table;