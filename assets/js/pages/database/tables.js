import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table, Link, Button, Spinner, Size, Modal} from '../../components';
import {Alert, DatabaseActions} from '../../actions';

class DatabaseTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            currentTable: '',
            columns: [],
            isLoading: false,
            showDeleteModal: false,
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.gotoUpdate = this.gotoUpdate.bind(this);
        this.gotoLogView = this.gotoLogView.bind(this);
        this.syncAll = this.syncAll.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.showDeleteConfirmationModal = this.showDeleteConfirmationModal.bind(this);
        this.onDeleteConfirmationModalHidden = this.onDeleteConfirmationModalHidden.bind(this);
    }

    loadData() {
        this.setState({
            isLoading: true
        });
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
        this.syncAll();
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
                isLoading: true
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
                        isLoading: false
                    });
                });
        }
    }

    gotoUpdate() {
        const {currentTable} = this.state;

        if (currentTable !== '') {
            window.location.href = '/table/' + currentTable;
        }
    }

    gotoLogView() {
        const {currentTable} = this.state;

        if (currentTable !== '') {
            window.location.href = '/table/' + currentTable + '/logview';
        }
    }

    syncAll() {
        const $this = this;
        DatabaseActions.syncAll().then(response => {
            const {error} = response;
            if (error === 0) {
                $this.loadData()
            }
        });
    }

    showDeleteConfirmationModal() {
        const showDeleteModal = true;

        this.setState({showDeleteModal})
    }

    deleteTable() {
        const that = this
        let {currentTable} = this.state;

        if (!currentTable) {
            return;
        }

        DatabaseActions.deleteTable(currentTable)
            .then(res => {
                const {error} = res;
                if (error !== 0) {
                    return;
                }

                const columns = [];
                currentTable = '';

                Alert.success('Remove successful');
                that.setState({currentTable, columns})
                that.onDeleteConfirmationModalHidden();
                that.syncAll();
            })
    }

    onDeleteConfirmationModalHidden() {
        const showDeleteModal = false;

        this.setState({showDeleteModal})
    }

    render() {
        const {tables, currentTable, columns, isLoading, showDeleteModal} = this.state;

        let url = '';
        if (currentTable !== '') {
            url = '/table/' + currentTable;
        }

        return (
            <div className="database container-fluid">
                <Modal
                    size={Size.medium}
                    id={'delete-table'}
                    title={`Deleting table \"${currentTable}\"`}
                    showCloseButton={true}
                    closeButtonTitle='Abort'
                    showSaveButton={true}
                    saveButtonTitle='OK'
                    saveButtonColor='danger'
                    saveButtonAction={this.deleteTable}
                    show={showDeleteModal}
                    onHidden={this.onDeleteConfirmationModalHidden}
                >
                    Be careful - this will also delete the table in clickhouse database!
                </Modal>
                <div className="card">
                    <CardHeader title="Table view" showCollapseButton={false}
                                showRemoveButton={false}/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <select className="form-control" value={currentTable}
                                        onChange={this.onTableChange}>
                                    <option value="">Please select table</option>
                                    {tables.map((item, key) => {
                                        return <option key={key} value={item}>{item}</option>;
                                    })}
                                </select>
                            </div>
                            <div
                                className="col-12 col-md-8 d-flex mt-3 mt-md-0 justify-content-md-end flex-wrap ms-0 ms-md-auto">
                                <Button disabled={url === ''} onClick={this.gotoUpdate}
                                        className="btn btn-primary me-md-2 mb-2">Update</Button>
                                <Button disabled={url === ''} onClick={this.gotoLogView}
                                        className="btn btn-primary me-md-2 mb-2">Log view
                                    setting</Button>
                                <Button onClick={this.syncAll}
                                        className={'btn btn-success me-md-2 mb-2'}>Sync
                                    tables</Button>
                                <div className="ms-auto ms-md-0">
                                    <Link href="/table/create"
                                          className="btn btn-success me-2 text-nowrap">Create
                                        table</Link>
                                </div>
                                <Button disabled={url === ''}
                                        onClick={this.showDeleteConfirmationModal}
                                        className="btn btn-danger me-md-2 mb-2">
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                {isLoading ? (<Spinner/>) : (
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {columns.map((item, key) => {
                                            return <tr key={key}>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
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
