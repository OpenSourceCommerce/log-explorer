import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Spinner} from '../../components';
import {Alert, DatabaseActions} from '../../actions';

class DatabaseForm extends Component {
    constructor(props) {
        super(props);
        const columns = [];
        for (let i = 0; i < 3; i++) {
            columns.push(this.getBlankColumn());
        }

        this.state = {
            isNew: !window.table,
            table: window.table ? window.table : '',
            columns,
            ttl: '',
            tableError: false,
            noColumnError: false,
            isLoading: false
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.addMoreColumn = this.addMoreColumn.bind(this);
        this.onTTLChange = this.onTTLChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadColumns(table) {
        const that = this;
        this.setState({
            isLoading: true
        });
        DatabaseActions.getTableColumns(table)
            .then(res => {
                const {error, table, data} = res;
                if (error) {
                    return;
                }

                const columns = [];
                for (const i in data) {
                    let column = data[i];
                    column = $.extend(that.getBlankColumn(), column);
                    column.isNew = false;
                    columns.push(column);
                }

                that.setState({
                    table,
                    columns,
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        const {table} = this.state;
        if (table) {
            this.loadColumns(table);
        }
    }

    getBlankColumn() {
        return {isNew: true, name: '', type: 'String', error: false};
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
        this.setState({
            isLoading: true
        });

        let {isNew, table, ttl, columns} = this.state;
        table = $.trim(table);
        ttl = $.trim(ttl);
        const validColumns = [];
        let hasErrorBefore = false;
        let hasError = false;
        if (table === '') {
            this.setState({
                tableError: true,
                isLoading: false
            });
            hasError = true;
        }

        for (const column of columns) {
            let {isNew, name, type, error} = column;
            column.error = false;
            if (error) {
                hasErrorBefore = true;
            }

            name = $.trim(name);
            if (isNew && name === '') {
                continue;
            }

            if (name === '') {
                column.error = true;
                hasError = true;
                continue;
            }

            validColumns.push({
                name,
                type
            });
        }

        if (hasError !== hasErrorBefore || hasError) {
            this.setState({
                columns,
                isLoading: false
            });
        }

        if (validColumns.length === 0) {
            hasError = true;
            this.setState({
                noColumnError: true,
                isLoading: false
            });
        }

        if (!hasError) {
            const that = this;
            DatabaseActions.createOrUpdate(isNew ? '' : table, {
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
                        that.loadColumns(table);
                    }
                }).then(() => {
                    this.setState({
                        isLoading: false
                    });
                });
        }
    }

    render() {
        const {isNew, table, ttl, columns, tableError, noColumnError, isLoading} = this.state;
        const readonly = !isNew;
        const types = window.clickhouseTypes;
        const _columns = columns.map((item, key) => {
            return <div key={key} className="form-group">
                <div className="row">
                    <div className="col-6">
                        <Input disabled={readonly && !item.isNew} value={item.name}
                            className={item.error ? 'is-invalid' : ''}
                            onChange={e => this.onColumnChange(key, 'name', e)}
                            placeholder="Name"/>
                    </div>
                    <div className="col-6">
                        <select disabled={readonly && !item.isNew} className="form-control"
                            value={item.type}
                            onChange={e => this.onColumnChange(key, 'type', e)}>
                            {types.map((type, k) => {
                                return <option key={k} value={type}>{type}</option>;
                            })}
                        </select>
                    </div>
                </div>
            </div>;
        });

        return (
            <div className="database container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title align-items-center p-2">{isNew ? 'Create new table' : 'Update table'}</h3>
                        <Button className="float-right" color={'success'}
                            onClick={this.onSubmit} isLoading={isLoading}>
                            {isNew ? 'Create table' : 'Update table'}
                        </Button>

                    </div>
                    <div className="card-body">
                        <form role="form">
                            <div className="form-group">
                                <label>Table name</label>
                                <Input disabled={readonly}
                                    className={tableError ? 'is-invalid' : ''}
                                    placeholder="Table name" value={table}
                                    onChange={this.onTableChange}/>
                            </div>
                            {isNew &&
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
                                    <div className="col-6">
                                        Name
                                    </div>
                                    <div className="col-6">
                                        Type
                                    </div>
                                </div>
                            </div>
                            {isLoading ? <Spinner/> : <>
                                {_columns}

                                <div className="box-footer">
                                    <Button color={'primary'} onClick={this.addMoreColumn}>Add
                                        more column</Button>
                                </div>
                            </>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<DatabaseForm/>, document.querySelector('#root'));
