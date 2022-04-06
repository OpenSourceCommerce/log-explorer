import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Button, CardHeader, Icon, Link, Modal, Size} from "../../components";
import {Alert, AlertActions, GraphActions} from "../../actions";
import {Table} from "../../components/_table";

class AlertList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            deletingAlert: null,
        };

        this.getData = this.getData.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
        this.deleteAlert = this.deleteAlert.bind(this)
    }

    getData() {
        AlertActions.listAlert().then((response) => {
            const {error, data} = response
            const deletingAlert = null

            if (error === 0) {
                this.setState({data, deletingAlert})
            }
        })
    }

    componentDidMount() {
        this.getData()
    }

    deleteAlert() {
        const $this = this;
        const {deletingAlert} = this.state;

        if (!deletingAlert) {
            return;
        }

        AlertActions.deleteAlert(deletingAlert.id)
            .then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                $this.getData()
                Alert.success('Delete successful');
            });
    }

    updateStatus(event) {
        const $this = this
        const {id} = event.target.dataset

        AlertActions.updateStatus(id).then(() => {
            $this.getData()
        })
    }

    render() {
        const {data, deletingAlert} = this.state

        return (
            <>
                <Modal
                    size={Size.medium}
                    id={'delete-alert'}
                    title={`Deleting Alert`}
                    showCloseButton={true}
                    closeButtonTitle='Abort'
                    showSaveButton={true}
                    saveButtonTitle='OK'
                    saveButtonColor='danger'
                    saveButtonAction={this.deleteAlert}
                    show={deletingAlert != null}
                    onHidden={() => {
                        this.setState({deletingAlert: null})
                    }}
                >
                    Do you want to delete this alert "{deletingAlert?.title}"?
                </Modal>
                <div className="card">
                    <CardHeader title="Alert List" showCollapseButton={false}
                                showRemoveButton={false}>
                        <Link href={'/alert/create'} className={'btn btn-success'}>
                            Create Alert
                        </Link>
                    </CardHeader>
                    <div className="card-body">
                        <Table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Table</th>
                                <th>Threshold</th>
                                <th>Interval</th>
                                <th>Is Active</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.title}</td>
                                        <td>{item.from_table}</td>
                                        <td>{item.threshold}</td>
                                        <td>{item.interval_time}</td>
                                        <td>
                                            <a href='#'
                                               onClick={this.updateStatus}>
                                                {
                                                    (item.isActive === '1') ?
                                                        <Icon className="text-success"
                                                              data-id={item.id}
                                                              name='check-circle'/> :
                                                        <Icon className="text-danger"
                                                              data-id={item.id}
                                                              name='times-circle'/>
                                                }
                                            </a>
                                        </td>
                                        <td>
                                            <Link href={`/alert/${item.id}`}
                                                  className={'btn btn-success btn-sm me-2'}>
                                                <Icon name={'edit'}/>
                                            </Link>
                                            <Link
                                                onClick={this.updateStatus}
                                                className={`btn btn-sm me-2 ${(item.isActive === '1'? 'btn-primary' : 'btn-warning')}`}
                                                data-id={item.id}>
                                                {(item.isActive === '1') ?
                                                    <Icon data-id={item.id}
                                                          name='check-circle'/> :
                                                    <Icon data-id={item.id}
                                                          name='times-circle'/>}
                                            </Link>
                                            <Button
                                                onClick={e => this.setState({deletingAlert: item})}
                                                className="btn-sm"
                                                color={'danger'}>
                                                <Icon name={'trash'}/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            {data.length < 1 && <tr>
                                <td colSpan={6}>
                                    <p>
                                        No Alert found
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

ReactDOM.render(<AlertList/>, document.querySelector('#root'));

