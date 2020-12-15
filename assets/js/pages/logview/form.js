import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader} from '../../components';
import {LogViewActions} from '../../actions';
import {GraphComponent} from '../graph/graph';

class LogViewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: window.logview,
            table: '',
            graph: null
        };
    }

    loadData(uuid) {
        const that = this;
        LogViewActions.loadLogView(uuid)
            .then(res => {
                const {error, table, graph} = res;
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
                    }
                });
            });
    }

    componentDidMount() {
        const {uuid} = this.state;
        this.loadData(uuid);
    }

    render() {
        const {table, graph} = this.state;

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Graph setting" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <form role="form">
                            <GraphComponent id={graph ? graph.id : ''} table={table} graph={graph ? graph : {}} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<LogViewForm/>, document.querySelector('#root'));
