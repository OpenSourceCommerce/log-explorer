import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader} from '../../components';
import {JsGridTable} from '../../components/_js-grid-table';

class Index extends Component {
    render() {
        const fields = [
            {
                name: 'ip',
                title: 'IP',
                type: 'text',
                width: 70
            },
            {
                name: 'host',
                title: 'Host',
                type: 'text',
                width: 150
            },
            {
                name: 'status',
                title: 'Status',
                type: 'number',
                width: 50
            },
            {
                name: 'timestamp',
                title: 'Timestamp',
                type: 'text'
            },
            {
                name: 'device_type',
                title: 'Device Type',
                type: 'text'
            }
        ];

        return (
            <div className="card">
                <CardHeader title={'Home Page'}/>
                <div className="card-body">
                    <JsGridTable dataSrc={'/stream/uuid/list'}
                        fields={fields}
                        pageSize={5}/>
                </div>
                <div className="card-footer">
                    Footer
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
