import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class DashboardPage extends Component {
    render() {
        const {dashboard} = this.props;

        return (
            <div>
            </div>
        );
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<DashboardPage {...root.dataset}/>, root);
