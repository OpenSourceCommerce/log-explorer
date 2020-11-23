import React, {Component} from 'react';
import {LogTableActions} from '../actions';
import {Table} from "./_table";

export class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: []
        };
    }

    loadData() {
        const $this = this;
        LogTableActions.getSummary()
            .then(response => {
                const {data, error} = response;

                if (error) {
                    return;
                }

                $this.setState({
                    widgets: data
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {widgets} = this.state;
        const items = widgets.map((item, key) =>
            <div key={key} className="card">
                <div className="card-header">
                    {item.title}
                </div>
                <div className="card-body p-0">
                    <Table className="table-bordered mb-0">
                        <tbody>
                            {item.data.map((summary, key) =>
                                <tr key={key}>
                                    <td width="50%">{summary.label}</td>
                                    <td width="50%">{summary.value}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
        return (
            <div {...this.props}>
                {items}
            </div>
        );
    }
}
