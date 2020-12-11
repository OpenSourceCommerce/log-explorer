import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table, Link, Button} from '../../components';
import {Alert, DatabaseActions} from '../../actions';

class DatabaseTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            currentTable: '',
            columns: []
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.syncAll = this.syncAll.bind(this);
        this.gotoUpdate = this.gotoUpdate.bind(this);
    }

    loadData() {
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

    componentDidMount() {
        this.loadData();
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

    syncAll() {
        DatabaseActions.syncAll().then(response => {
            const {error} = response;
            if (error === 0) {
                Alert.success('Sync successful');
                this.loadData();
            }
        });
    }

    gotoUpdate() {
        const {currentTable} = this.state;

        if (currentTable !== '') {
            window.location.href = '/database/' + currentTable;
        }
    }

    render() {
        const {tables, currentTable, columns} = this.state;

        let url = '';
        if (currentTable !== '') {
            url = '/database/' + currentTable;
        }

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Database view" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 col-md-2">Table</div>
                            <div className="col-6 col-md-6">
                                <select className="form-control" value={currentTable} onChange={this.onTableChange}>
                                    <option value="">Please select</option>
                                    {tables.map((item, key) => {
                                        return <option key={key} value={item.name}>{item.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col-3 col-md-4">
                                <Button disabled={url === ''} onClick={this.gotoUpdate} className="btn btn-primary">Update</Button>
                                <Link href="/database/create" className="btn btn-success ml-3">Create table</Link>
                                <Button onClick={this.syncAll} className="btn btn-success ml-3">Sync table</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Display name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {columns.map((item, key) => {
                                            return <tr key={key}>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
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
