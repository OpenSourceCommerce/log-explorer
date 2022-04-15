import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table, Link, Button, Icon} from '../../components';
import {Alert, GraphActions} from '../../actions';

class GraphList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphs: []
        };
    }

    componentDidMount() {
        const that = this;
        GraphActions.listGraph()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    graphs: data
                });
            });
    }

    deleteGraph(key) {
        const {graphs} = this.state;
        const that = this;
        GraphActions.deleteGraph(graphs[key].id)
            .then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                graphs.splice(key, 1);
                that.setState({graphs});
                Alert.success('Delete successful');
            });
    }

    render() {
        const {graphs} = this.state;

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Graph list" showCollapseButton={false} showRemoveButton={false}>
                        <Link href={'/graph/create'} className={'btn btn-success'}>Create graph</Link>
                    </CardHeader>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Table</th>
                                            <th>Title</th>
                                            <th>Max point</th>
                                            <th>Last update</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {graphs.map((item, key) => {
                                            const url = '/graph/' + item.id;
                                            return <tr key={key}>
                                                <td>{item.table_name}</td>
                                                <td>{item.title}</td>
                                                <td>{item.max_point}</td>
                                                <td>{item.last_updated}</td>
                                                <td>
                                                    <Link href={url} className={'btn btn-success me-3'}><Icon name={'edit'}/></Link>
                                                    <Button onClick={e => this.deleteGraph(key)} color={'danger'}><Icon name={'trash'}/></Button>
                                                </td>
                                            </tr>;
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<GraphList/>, document.querySelector('#root'));
