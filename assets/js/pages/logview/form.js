import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, GraphForm, SummaryForm} from '../../components';
import {LogViewActions} from '../../actions';

class LogViewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: window.logview,
            table: '',
            graph: null,
            columns: [],
            summary: []
        };
    }

    loadData(uuid) {
        const that = this;
        LogViewActions.loadLogView(uuid)
            .then(res => {
                const {error, table, graph, summary, columns} = res;
                if (error) {
                    return;
                }

                const {id, table_id, title, max_point, lines} = graph;
                that.setState({
                    table,
                    graph: {
                        id: String(id),
                        tableId: String(table_id),
                        title,
                        maxPoint: String(max_point),
                        lines
                    },
                    summary,
                    columns
                });
            });
    }

    componentDidMount() {
        const {uuid} = this.state;
        this.loadData(uuid);
    }

    render() {
        const {uuid, table, graph, summary, columns} = this.state;
        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Graph setting" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <form role="form">
                            <GraphForm id={graph ? graph.id : ''} table={table} graph={graph ? graph : {}} />
                        </form>
                    </div>
                </div>
                <div className="card">
                    <CardHeader title="Summary setting" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <form role="form">
                            <SummaryForm logViewUuid={uuid} summary={summary} columns={columns} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<LogViewForm/>, document.querySelector('#root'));
