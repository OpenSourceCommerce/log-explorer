import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader} from '../../components';
import {JsGridTable} from '../../components/_js-grid-table';
import {LogTableActions} from '../../actions';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: []
        };
    }

    getFields() {
        const $this = this;
        LogTableActions.getColumns()
            .then(response => {
                $this.setState({fields: response.data});
            });
    }

    componentDidMount() {
        this.getFields();
    }

    render() {
        const {fields} = this.state;

        return (
            <div className="card">
                <CardHeader title={'Home Page'}/>
                <div className="card-body">
                    {fields && fields.length > 0 && <JsGridTable dataSrc={'/stream/uuid/list'}
                        fields={fields}
                        pageSize={5}/>}
                </div>
                <div className="card-footer">
                    Footer
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
