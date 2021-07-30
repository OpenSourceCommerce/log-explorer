import React, {Component} from "react";
import ReactDOM from "react-dom";
import {AlertForm, CardHeader, Link} from "../../components";

class AlertFormPage extends Component {
    render() {
        let {alertId} = this.props

        return (
            <>
                <div className="card">
                    <CardHeader title={alertId? 'Update Alert' : 'Create new Alert'} showCollapseButton={false}
                                showRemoveButton={false}>
                    </CardHeader>
                    <div className="card-body">
                        <AlertForm alertId={alertId}/>
                    </div>
                </div>
            </>
        )
    }
}

const root = document.querySelector('#root')

ReactDOM.render(<AlertFormPage {...root.dataset}/>, root);
