import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table, Link, Button, Spinner} from '../../components';
import {Alert, DatabaseActions} from '../../actions';

class DatabaseTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            currentTable: '',
            columns: [],
            isLoading: false,
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.syncAll = this.syncAll.bind(this);
        this.gotoUpdate = this.gotoUpdate.bind(this);
    }

    loadData() {
        this.setState({
            isLoading: true,
        })
        const that = this;
        DatabaseActions.getAllTable()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    tables: data,
                    isLoading: false
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
            this.setState({
                isLoading: true,
            });
            DatabaseActions.getTableColumns(e.target.value)
                .then(res => {
                    const {error, table, data} = res;
                    if (error) {
                        return;
                    }

                    that.setState({
                        currentTable: table,
                        columns: data,
                        isLoading: false,
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
        const {tables, currentTable, columns, isLoading} = this.state;

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
                            <div className="col-12 col-md-4">
                                <select className="form-control" value={currentTable} onChange={this.onTableChange}>
                                    <option value="">Please select table</option>
                                    {tables.map((item, key) => {
                                        return <option key={key} value={item.name}>{item.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col-12 col-md-8 d-flex mt-3 mt-md-0 justify-content-md-end flex-wrap ml-0 ml-md-auto">
                                <Button disabled={url === ''} onClick={this.gotoUpdate} className="btn btn-primary mr-md-2 mb-2">Update</Button>
                                <div className="ml-auto ml-md-0">
                                    <Link href="/database/create" className="btn btn-success mr-2 text-nowrap">Create table</Link>
                                    <Button onClick={this.syncAll} className="btn btn-success text-nowrap">Sync table</Button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                {isLoading ? (<Spinner />) : (
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
                                    </Table>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<DatabaseTables/>, document.querySelector('#root'));
