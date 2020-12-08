import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader} from '../../components';
import {Button} from '../../components/_button';
import {Alert, DatabaseActions} from '../../actions';

const TEMPLATE_CREATE = 'CREATE TABLE nginx_access (\n    `ip` String,\n    `customer` String,\n    `timestamp` DateTime COMMENT \'Time\',\n    `url` String,\n    `status` UInt16,\n    `body_bytes_sent` UInt64 COMMENT \'Size\',\n    `referer` String,\n    `user_agent` String\n)\nENGINE = MergeTree\nPARTITION BY (toYYYYMM(timestamp))\nORDER BY timestamp\nSETTINGS index_granularity = 8192\n';
const TEMPLATE_ADD_COLUMN = 'ALTER TABLE nginx_access ADD COLUMN host String COMMENT \'Host name\'';
const TEMPLATE_DROP_COLUMN = 'ALTER TABLE nginx_access DROP COLUMN IF EXISTS host';
const TEMPLATE_COMMENT_COLUMN = 'ALTER TABLE nginx_access COMMENT COLUMN host \'Host name\'';
const TEMPLATE_MODIFY_COLUMN = 'ALTER TABLE nginx_access MODIFY COLUMN host String COMMENT \'Host name\'';

class CreateDatabase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: TEMPLATE_CREATE
        };
        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.syncAll = this.syncAll.bind(this);
        this.makeQuery = this.makeQuery.bind(this);
    }

    onQueryChange(e) {
        this.setState({
            query: e.target.value
        });
    }

    onSubmit() {
        const {query} = this.state;

        DatabaseActions.runQuery({
            query
        }).then(response => {
            const {error} = response;
            if (error === 0) {
                Alert.success('Run successful');
            }
        });
    }

    syncAll() {
        DatabaseActions.syncAll().then(response => {
            const {error} = response;
            if (error === 0) {
                Alert.success('Sync successful');
            }
        });
    }

    makeQuery(e) {
        let query = false;
        switch (e.target.name) {
            case 'template_create':
                query = TEMPLATE_CREATE;
                break;
            case 'template_add_column':
                query = TEMPLATE_ADD_COLUMN;
                break;
            case 'template_drop_column':
                query = TEMPLATE_DROP_COLUMN;
                break;
            case 'template_comment_column':
                query = TEMPLATE_COMMENT_COLUMN;
                break;
            case 'template_modify_column':
                query = TEMPLATE_MODIFY_COLUMN;
                break;
            default:
                break;
        }

        if (query) {
            this.setState({
                query
            });
        }
    }

    render() {
        const {query} = this.state;
        const txtClass = 'form-control h-100';

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Database query" showCollapseButton={false} showRemoveButton={false}/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12 min-vh-100">
                                        <textarea className={txtClass} value={query} onChange={this.onQueryChange}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Select a SQL template</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-3">
                                        <Button name="template_create" className="mr-3 mb-3" onClick={this.makeQuery}>Create table</Button>
                                        <Button name="template_add_column" className="mr-3 mb-3" onClick={this.makeQuery}>Add column</Button>
                                        <Button name="template_drop_column" className="mr-3 mb-3" onClick={this.makeQuery}>Drop column</Button>
                                        <Button name="template_comment_column" className="mr-3 mb-3" onClick={this.makeQuery}>Comment column</Button>
                                        <Button name="template_modify_column" className="mr-3 mb-3" onClick={this.makeQuery}>Modify column</Button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-3">
                                        <div className="callout callout-success">
                                            <h6><strong>COMMENT</strong> is used to custom display name in dashboard</h6>
                                            <p><code className="p-1 d-inline-block">`timestamp` DateTime <span className="text-black">COMMENT 'Time'</span>,</code></p>
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={this.onSubmit} className={'btn-success'}>Run query</Button>
                                <hr/>
                                <p>Or if you already have tables, you can simple click bellow button to sync all tables to this system</p>
                                <Button onClick={this.syncAll} className={'btn btn-success'}>Sync all existing tables</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<CreateDatabase/>, document.querySelector('#root'));
