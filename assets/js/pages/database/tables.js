import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table} from '../../components';
import {DatabaseActions} from '../../actions';

class DatabaseTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            currentTable: '',
            columns: []
        };
        this.onTableChange = this.onTableChange.bind(this);
    }

    componentDidMount() {
        const that = this;
        DatabaseActions.getAllTable()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    tables: data
                });
            });
    }

    onTableChange(e) {
        const that = this;
        this.setState({
            currentTable: e.target.value
        });
        if (e.target.value === '') {
            this.setState({
                columns: []
            });
        } else {
            DatabaseActions.getTableColumns(e.target.value)
                .then(res => {
                    const {error, table, data} = res;
                    if (error) {
                        return;
                    }

                    that.setState({
                        currentTable: table,
                        columns: data
                    });
                });
        }
    }

    render() {
        const {tables, currentTable, columns} = this.state;

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Database view" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 col-md-2">Table</div>
                            <div className="col-8 col-md-10">
                                <select className="form-control" value={currentTable} onChange={this.onTableChange}>
                                    <option value="">Please select</option>
                                    {tables.map((item, key) => {
                                        return <option key={key} value={item.name}>{item.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Display name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {columns.map((item, key) => {
                                            return <tr key={key}>
                                                <td>{item.name}</td>
                                                <td>{item.title}</td>
                                            </tr>;
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<DatabaseTables/>, document.querySelector('#root'));
