import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {WidgetManagement} from "../../components";

class WidgetPage extends Component {
    render() {
        return (
            <div>
                <WidgetManagement {...this.props} />
            </div>
        );
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<WidgetPage {...root.dataset}/>, root);
