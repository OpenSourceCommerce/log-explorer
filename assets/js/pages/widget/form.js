import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class WidgetPage extends Component {
    render() {
        const {widget} = this.props;

        return (
            <div>
            </div>
        );
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<WidgetPage {...root.dataset}/>, root);
