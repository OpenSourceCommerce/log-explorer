import React, {Component} from "react";
import ReactDOM from "react-dom";
import {CardHeader, Colors, Icon, Link, Modal, Size} from "../../components";
import {ExportActions} from "../../actions";
import {Table} from "../../components/_table";

class ExportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedExportId: null
        };

        this.getData = this.getData.bind(this)
        this.deleteExport = this.deleteExport.bind(this)
        this.showConfirmDeleteModal = this.showConfirmDeleteModal.bind(this)
    }

    getData() {
        ExportActions.listExport().then((response) => {
            const {error, data} = response

            if (error === 0) {
                this.setState({data})
            }
        })
    }

    componentDidMount() {
        this.getData()
    }

    showConfirmDeleteModal(e) {
        const {id} = e.target.dataset
        this.setState({selectedExportId: id})
    }

    deleteExport() {
        const that = this
        const {selectedExportId} = this.state

        if (!selectedExportId) {
            return
        }

        ExportActions.deleteExport(selectedExportId).then(() => {
            that.getData()
            that.setState({selectedExportId: null})
        })
    }

    render() {
        const {data, selectedExportId} = this.state

        return (
            <>
                <Modal
                    id="delete-export"
                    title='Confirm Delete'
                    children={`Are you sure you want to delete this export?`}
                    saveButtonTitle='Delete'
                    showSaveButton={true}
                    size={Size.medium}
                    closeButtonTitle='Cancel'
                    saveButtonColor={Colors.red}
                    show={!!selectedExportId}
                    closeButtonAction={() => {
                        this.setState({
                            selectedExportId: null,
                        })
                    }}
                    saveButtonAction={this.deleteExport}
                />
                <div className="card">
                    <CardHeader title="Export List" showCollapseButton={false}
                                showRemoveButton={false}>
                    </CardHeader>
                    <div className="card-body">
                        <Table>
                            <thead>
                            <tr>
                                <th>Table</th>
                                <th>Format</th>
                                <th>Created At</th>
                                <th>Is Finished</th>
                                <th>Expired At</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.table}</td>
                                        <td>{item.format}</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            {item.isFinished ?
                                                <Icon className="text-success"
                                                      name='check-circle'/> :
                                                <Icon className="text-secondary"
                                                      name='minus'/>}
                                        </td>
                                        <td>
                                            {item.isFinished ?
                                                item.expiredAt :
                                                <Icon className="text-secondary"
                                                      name='minus'/>}
                                        </td>
                                        <td>
                                            {item.isFinished ?
                                                <Link href={item.path} target="_blank"
                                                      className="me-4"
                                                      title="Download"
                                                      download={item.filename}>
                                                    <Icon className="text-primary" name='download'/>
                                                </Link> : ''}

                                            <Icon onClick={this.showConfirmDeleteModal}
                                                  data-id={item.id}
                                                  className="text-danger"
                                                  title="Delete"
                                                  style={{cursor: "pointer"}}
                                                  name='trash'/>
                                        </td>
                                    </tr>
                                )
                            })}
                            {data.length < 1 && <tr>
                                <td colSpan={4}>
                                    <p>
                                        No Export found
                                    </p>
                                </td>
                            </tr>}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </>
        )
    }
}

ReactDOM.render(<ExportList/>, document.querySelector('#root'));

