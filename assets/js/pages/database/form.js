import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Spinner, Modal, Size} from '../../components';
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
            originTable: window.table ? window.table : '',
            table: window.table ? window.table : '',
            columns,
            ttl: '',
            tableError: false,
            noColumnError: false,
            isLoading: false,
            deletingColumn: null,
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.addMoreColumn = this.addMoreColumn.bind(this);
        this.onTTLChange = this.onTTLChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showDeleteConfirmationModal = this.showDeleteConfirmationModal.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
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
                    column.origin = column.name;
                    column.originType = column.type;
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
        return {isNew: true, name: '', origin: '', type: 'String', originType: '', error: false};
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

    deleteColumn() {
        let {table, deletingColumn, columns} = this.state;

        if (!deletingColumn) {
            return;
        }

        DatabaseActions.deleteColumn(table, deletingColumn.origin)
            .then(res => {
                const {error} = res;
                if (error !== 0) {
                    return;
                }
                Alert.success('Remove successful');
                const key = columns.findIndex((el) => el.origin === deletingColumn.origin)
                columns.splice(key, 1);
                this.setState({
                    columns,
                    deletingColumn: null
                });
            })
    }

    showDeleteConfirmationModal(deletingColumn) {
        this.setState({deletingColumn})
    }

    onSubmit() {
        let {originTable, table, ttl, columns} = this.state;
        table = $.trim(table);
        ttl = $.trim(ttl);
        const change = [];
        const validColumns = [];
        let hasErrorBefore = false;
        let hasError = false;
        let hasNew = false;
        if (table === '') {
            this.setState({
                tableError: true,
                isLoading: false
            });
            hasError = true;
        }

        if (table !== originTable) {
            change.push(`Table from "${originTable}" to "${table}"`);
        }
        for (const column of columns) {
            let {isNew, name, origin, type, originType, error} = column;
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

            if (!isNew) {
                if (name !== origin) {
                    change.push(`Column from "${origin}" to "${name}"`);
                }
                if (type !== originType) {
                    change.push(`Column "${origin}" from "${originType}" to "${type}"`);
                }
            } else {
                hasNew = true;
            }

            validColumns.push({
                name,
                origin,
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
            const tableData = {
                name: table,
                ttl,
                columns: validColumns
            }
            if (originTable && change.length > 0) {
                Alert.confirm("Are you sure to change table structure?\n" + change.join("\n"), () => {
                    this.createOrUpdate(originTable, tableData);
                })
            } else if (!originTable || hasNew)  {
                this.createOrUpdate(originTable, tableData);
            }
        }
    }

    createOrUpdate(table, data) {
        const that = this;
        this.setState({
            isLoading: true
        });
        DatabaseActions.createOrUpdate(table, data)
            .then(res => {
                const {error, redirect} = res;
                if (error !== 0) {
                    return;
                }

                if (redirect) {
                    Alert.success('Create successful');
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

    render() {
        const {
            isNew,
            table,
            ttl,
            columns,
            tableError,
            noColumnError,
            isLoading,
            deletingColumn
        } = this.state;
        const readonly = !isNew;
        const types = window.clickhouseTypes;
        const _columns = columns.map((item, key) => {
            const disabled = readonly && !item.isNew && (item.origin === 'timestamp' || item.origin === '_id');
            return <div key={key} className="form-group">
                <div className="row">
                    <div className="col-5">
                        <Input disabled={disabled} value={item.name}
                               className={(item.error ? 'is-invalid ' : '') + 'table_field'}
                               onChange={e => this.onColumnChange(key, 'name', e)}
                               placeholder="Name"/>
                    </div>
                    <div className="col-5">
                        <select disabled={disabled} className="form-control table_type"
                                value={item.type}
                                onChange={e => this.onColumnChange(key, 'type', e)}>
                            {types.map((type, k) => {
                                return <option key={k} value={type}>{type}</option>;
                            })}
                        </select>
                    </div>
                    {!disabled && !item.isNew &&
                    <div className="col">
                        <a onClick={() => this.showDeleteConfirmationModal(item)} href='#'
                           className="btn btn-danger table_rm_column"><i className="fa fa-trash"></i></a>
                    </div>}
                </div>
            </div>;
        });

        return (
            <div className="database container-fluid">
                <Modal
                    size={Size.medium}
                    id={'delete-column'}
                    title={`Deleting column \"${deletingColumn?.origin}\"`}
                    showCloseButton={true}
                    closeButtonTitle='Abort'
                    showSaveButton={true}
                    saveButtonTitle='OK'
                    saveButtonColor='danger'
                    saveButtonAction={this.deleteColumn}
                    show={deletingColumn != null}
                    onHidden={() => {
                        this.setState({deletingColumn: null})
                    }}
                >
                    <p className={'text-danger'}>
                        Be careful - this will also delete the column in clickhouse table!
                    </p>
                </Modal>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title align-items-center p-2">{isNew ? 'Create new table' : 'Update table'}</h3>
                        <Button className="float-end" color={'success'}
                                onClick={this.onSubmit} isLoading={isLoading}>
                            {isNew ? 'Create table' : 'Update table'}
                        </Button>

                    </div>
                    <div className="card-body">
                        <form role="form">
                            <div className="form-group">
                                <label>Table name</label>
                                <Input
                                    name="table_name"
                                    className={tableError ? 'is-invalid' : ''}
                                    placeholder="Table name" value={table}
                                    onChange={this.onTableChange}/>
                            </div>
                            {isNew &&
                            <div className="form-group">
                                <label>Table TTL</label>
                                <Input disabled={readonly}
                                       name="table_ttl"
                                       placeholder="timestamp + toIntervalMonth(100)" value={ttl}
                                       onChange={this.onTTLChange}/>
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
                                    <Button id="btn-more-column" color={'primary'} onClick={this.addMoreColumn}>Add
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
