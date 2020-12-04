import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader} from '../../components';
import {Table} from '../../components/_table';
import {Button} from '../../components/_button';
import {Alert, DatabaseActions} from '../../actions';

const DEFAULT_TEMPLATE = 'CREATE TABLE nginx_access (\n    `ip` String,\n    `customer` String,\n    `timestamp` DateTime, # Time\n    `url` String,\n    `status` UInt16,\n    `body_bytes_sent` UInt64, # Size\n    `referer` String,\n    `user_agent` String\n)\nENGINE = MergeTree\nPARTITION BY (toYYYYMM(timestamp))\nORDER BY timestamp\nSETTINGS index_granularity = 8192\n';

class CreateDatabase extends Component {
    constructor(props) {
        super(props);
        const {table, columns, hasError} = this.analysis(DEFAULT_TEMPLATE);
        this.state = {
            query: DEFAULT_TEMPLATE,
            table,
            columns,
            hasError
        };
        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    analysis(sql) {
        let table = '';
        let columns = [];
        sql = sql.replace(/\n/g, ' ');
        sql = sql.replace(/(\s+)/g, ' ');

        // find table
        let res = /^create table( if not exist)? ([\w.]+) \(/i.exec(sql);
        if (res) {
            table = res[2];
        } else {
            return {table, columns, hasError: true};
        }
        sql = $.trim(sql.replace(/^create table( if not exist)? ([\w.]+) \(/i, ''));
        let endOfColumn = sql.indexOf(')');
        if (endOfColumn <= 0) {
            return {table, columns, hasError: true};
        }
        sql = $.trim(sql.substring(0, endOfColumn));

        // find columns
        while (sql.length > 0) {
            let name, type, title;
            res = /^`(\w+)` (\w+)(\s\,)?/.exec(sql);
            if (res) {
                name = res[1];
                type = res[2];
                title = '';
            } else {
                return {table, columns, hasError: true};
            }
            endOfColumn = sql.indexOf(',');
            if (endOfColumn > 0) {
                sql = $.trim(sql.substring(endOfColumn + 1));
                if (sql === '') {
                    return {table, columns, hasError: true};
                }
                if (sql.startsWith('#')) {
                    let startNewColumn = sql.indexOf('`');
                    if (startNewColumn > 0) {
                        title = $.trim(sql.substring(1, startNewColumn));
                        sql = sql.substring(startNewColumn);
                    } else {
                        return {table, columns, hasError: true};
                    }
                }
            } else {
                let arr = sql.split('#', 2);
                if (arr.length === 2) {
                    title = $.trim(arr[1]);
                }
                sql = '';
            }
            if (title === '') {
                title = name.replace(/_/g, ' ');
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }
            columns.push({
                name: name,
                type: type,
                title: title
            })
        }
        return {table, columns, hasError: false};
    }

    onQueryChange(e) {
        const sql = e.target.value;
        const {table, columns, hasError} = this.analysis(sql);
        this.setState({
            query: sql,
            table,
            columns,
            hasError
        });
    }

    onSubmit() {
        const {query, table, columns} = this.state;
        if (table === '' || columns.length === 0) {
            Alert.error('Can not detect table and columns');
            return;
        }

        DatabaseActions.createTable({
            query
        }).then(response => {
            const {error, redirect} = response;
            if (error === 0) {
                window.location.href = redirect;
            }
        });
    }

    render() {
        const {query, table = '', columns = [], hasError} = this.state;
        let txtClass = 'form-control h-100';
        if (hasError) {
            txtClass += ' is-invalid';
        }
        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Create database" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12 min-vh-100">
                                        <textarea className={txtClass} value={query} onChange={this.onQueryChange}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-3">
                                        <p>This is default template, please modify it for your database table</p>
                                        <p>* Add display name after "#" <span className="bg-secondary disabled color-palette p-1">`timestamp` DateTime, <span className="text-pink"># Time</span></span> to allow custom display name of column (it WILL BE REMOVED on real query)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <p>Table name: {table}</p>
                                <p>Columns:</p>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Display</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {columns.map((item, key) => {
                                            return <tr key={key}>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
                                                <td>{item.title}</td>
                                            </tr>;
                                        })}
                                    </tbody>
                                </Table>
                                <Button disabled={hasError} onClick={this.onSubmit} className={'btn-success'}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<CreateDatabase/>, document.querySelector('#root'));
