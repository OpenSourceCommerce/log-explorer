import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input} from '../../components';
import {Alert, DatabaseActions} from '../../actions';
import {Button} from '../../components/_button';

class DatabaseForm extends Component {
    constructor(props) {
        super(props);
        const columns = [];
        for (let i = 0; i < 3; i++) {
            columns.push(this.getBlankColumn());
        }

        this.state = {
            tableId: window.table_id ? window.table_id : '',
            table: '',
            columns,
            ttl: '',
            tableError: false,
            noColumnError: false
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.addMoreColumn = this.addMoreColumn.bind(this);
        this.onTTLChange = this.onTTLChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadColumns(tableId) {
        const that = this;
        DatabaseActions.getTableColumns(tableId)
            .then(res => {
                const {error, table, data} = res;
                if (error) {
                    return;
                }

                const columns = [];
                for (const i in data) {
                    let column = data[i];
                    column = $.extend(that.getBlankColumn(), column);
                    columns.push(column);
                }

                that.setState({
                    table,
                    columns
                });
            });
    }

    componentDidMount() {
        const {tableId} = this.state;
        if (tableId) {
            this.loadColumns(tableId);
        }
    }

    getBlankColumn() {
        return {id: '', name: '', type: 'String', title: '', error: false};
    }

    onTableChange(e) {
        this.setState({
            table: e.target.value,
            tableError: false
        });
    }

    onTTLChange(e) {
        this.setState({
            ttl: e.target.value
        });
    }

    onColumnChange(key, name, e) {
        const {columns} = this.state;
        columns[key][name] = e.target.value;
        this.setState({
            columns,
            noColumnError: false
        });
    }

    addMoreColumn() {
        const {columns} = this.state;
        for (let i = 0; i < 3; i++) {
            columns.push(this.getBlankColumn());
        }

        this.setState({
            columns
        });
    }

    onSubmit() {
        let {tableId, table, ttl, columns} = this.state;
        table = $.trim(table);
        ttl = $.trim(ttl);
        const validColumns = [];
        let hasErrorBefore = false;
        let hasError = false;
        if (table === '') {
            this.setState({
                tableError: true
            });
            hasError = true;
        }

        for (const column of columns) {
            let {id, name, title, type, error} = column;
            column.error = false;
            if (error) {
                hasErrorBefore = true;
            }

            name = $.trim(name);
            title = $.trim(title);
            if (id === '' && name === '' && title === '') {
                continue;
            }

            if (name === '' && (title !== '')) {
                column.error = true;
                hasError = true;
                continue;
            }

            validColumns.push({
                id,
                name,
                title,
                type
            });
        }

        if (hasError !== hasErrorBefore || hasError) {
            this.setState({
                columns
            });
        }

        if (validColumns.length === 0) {
            hasError = true;
            this.setState({
                noColumnError: true
            });
        }

        if (!hasError) {
            const that = this;
            DatabaseActions.createOrUpdate(tableId, {
                name: table,
                ttl,
                columns: validColumns
            })
                .then(res => {
                    const {error, redirect} = res;
                    if (error !== 0) {
                        return;
                    }

                    if (redirect) {
                        window.location.href = redirect;
                    } else {
                        Alert.success('Update successful');
                        that.loadColumns(tableId);
                    }
                });
        }
    }

    render() {
        const {tableId, table, ttl, columns, tableError, noColumnError} = this.state;
        const readonly = tableId !== '';
        const types = window.clickhouseTypes;
        const _columns = columns.map((item, key) => {
            return <div key={key} className="form-group">
                <div className="row">
                    <div className="col-4">
                        <Input disabled={readonly && item.id !== ''} value={item.name} className={item.error ? 'is-invalid' : ''} onChange={e => this.onColumnChange(key, 'name', e)} placeholder="Name" />
                    </div>
                    <div className="col-4">
                        <select disabled={readonly && item.id !== ''} className="form-control" value={item.type} onChange={e => this.onColumnChange(key, 'type', e)}>
                            {types.map((type, k) => {
                                return <option key={k} value={type}>{type}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-4">
                        <Input value={item.title} onChange={e => this.onColumnChange(key, 'title', e)} placeholder="Display name" />
                    </div>
                </div>
            </div>;
        });

        return (
            <div className="database">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title align-items-center p-2">{tableId === '' ? 'Create new table' : 'Update table'}</h3>
                        <Button className="float-right" color={'success'} onClick={this.onSubmit} >{tableId === '' ? 'Create table' : 'Update table'}</Button>
                    </div>
                    <div className="card-body">
                        <form role="form">
                            <div className="form-group">
                                <label>Table name</label>
                                <Input disabled={readonly} className={tableError ? 'is-invalid' : ''} placeholder="Table name" value={table} onChange={this.onTableChange}/>
                            </div>
                            {tableId === '' &&
                            <div className="form-group">
                                <label>Table TTL</label>
                                <Input disabled={readonly} placeholder="timestamp + toIntervalMonth(100)" value={ttl} onChange={this.onTTLChange}/>
                            </div>}
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Column</label>
                                {noColumnError && <div className={'row has-error'}>
                                    <span className={'col-12 text-red'}>Please fill at less one column</span>
                                </div>}
                                <div className="row">
                                    <div className="col-4">
                                        Name
                                    </div>
                                    <div className="col-4">
                                        Type
                                    </div>
                                    <div className="col-4">
                                        Display name
                                    </div>
                                </div>
                            </div>
                            {_columns}

                            <div className="box-footer">
                                <Button color={'primary'} onClick={this.addMoreColumn} >Add more column</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<DatabaseForm/>, document.querySelector('#root'));
