import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader} from '../../components';
import {GraphComponent} from "./graph";

class GraphForm extends Component {
    render() {
        const id = window.graph_id ? window.graph_id : '';

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Graph setting" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <form role="form">
                            <GraphComponent id={id} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<GraphForm/>, document.querySelector('#root'));
