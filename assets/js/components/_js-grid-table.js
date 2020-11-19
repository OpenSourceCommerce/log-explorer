import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'admin-lte/plugins/jsgrid/demos/db';
import 'admin-lte/plugins/jsgrid/jsgrid.min';
import 'admin-lte/plugins/jsgrid/jsgrid.min.css';
import 'admin-lte/plugins/jsgrid/jsgrid-theme.min.css';

export class JsGridTable extends Component {
    componentDidMount() {
        $(() => {
            $('#jsGrid1')
                .jsGrid({
                    height: '100%',
                    width: '100%',

                    sorting: true,
                    paging: true,

                    data: window.db.clients,

                    fields: [
                        {
                            name: 'Name',
                            type: 'text',
                            width: 150
                        },
                        {
                            name: 'Age',
                            type: 'number',
                            width: 50
                        },
                        {
                            name: 'Address',
                            type: 'text',
                            width: 200
                        },
                        {
                            name: 'Country',
                            type: 'select',
                            items: window.db.countries,
                            valueField: 'Id',
                            textField: 'Name'
                        },
                        {
                            name: 'Married',
                            type: 'checkbox',
                            title: 'Is Married'
                        }
                    ]
                });
        });
    }

    render() {
        return (
            <div id="jsGrid1">
                &nbsp;
            </div>
        );
    }
}

JsGridTable.propTypes = {};

ReactDOM.render(<JsGridTable/>, document.querySelector('#js-grid'));
