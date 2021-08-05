import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Button, CardHeader, Icon, Link, Modal, Size} from "../../components";
import {Alert, ExportActions, GraphActions} from "../../actions";
import {Table} from "../../components/_table";

class ExportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        this.getData = this.getData.bind(this)
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

    render() {
        const {data} = this.state

        return (
            <>
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
                                <th>Download</th>
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
                                                      download={item.filename}>
                                                    <Icon className="text-primary"
                                                          name='download'/>
                                                </Link> :
                                                <Icon className="text-secondary"
                                                      name='minus'/>}
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

