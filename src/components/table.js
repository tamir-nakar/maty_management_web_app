import React from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
//import ReactDataGridPlugins from 'react-data-grid/addons';
import '../css/styles.css'

class Table extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.createCols();
        this.createRows();
    }

    createCols = () => {

        let cols = [];
        this.props.colsArr.map( (colName, index) => {

            cols.push({
                key: index,
                name: colName,
                editable: true,
                //width: 100,
            })
        });

        this.colsCopy = cols;
        return cols;
    };

    createRows = () => {

        let row = {};
        let rows = [];

        for (let i = 1; i <= this.props.numOfRows; i++) {

            this.colsCopy.map((col) => {
                row[col.key.toString()] = ' ';
            });

            rows.push(row);
        }

        this.state.rows = rows;
        console.log(this.state.rows);
    };

    state = {
        rows: null,
    };


    rowGetter = (i) => {
        return this.state.rows[i];
    };

    handleAddRow = () => {

        const lastIDX = this.state.rows.length;
        const newRow = {};
        newRow[lastIDX] = ' ';


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
            let currentRowToCpy = this.state.rows[i];

            let newRow = Object.keys(currentRowToCpy).map(function(key) {
                return currentRowToCpy[key];
            });


            dataToSubmit_supplyRows['table_rows'].push(newRow);
        }

            fetch('https://52939a87.ngrok.io/table', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit_createTable)
            }).then( (response)=> {console.log(response.status); if(response.status === 200) fetch(`https://52939a87.ngrok.io/table/${this.props.tableName}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit_supplyRows)
            })});

        //console.log(JSON.stringify(dataToSubmit_createTable));

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

        console.log('there is something to render the cols arry is: ' + this.props.cols + ' ');

        return  (
            <div>
                <ReactDataGrid
                    style={{"border-radius":"20px"}}
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