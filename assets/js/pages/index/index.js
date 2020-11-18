import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table} from '../../components';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const data = [
            {
                id: 1,
                date: '2020-11-18',
                hostname: 'megento-web',
                statusCode: 200,
                message: '167.245.104.48 - - [18/Nov/2020:07:17:17 +0000] "GET /molo-owl-bag-across-body-bag-grey-flannel-m8553i00f-c11.html HTTP/2.0" 200 13325 "-" "Mozilla/5.0 (iPad; CPU OS 8_2_2 like Mac OS X; en-US) AppleWebKit/533.4.3 (KHTML, like Gecko) Version/3.0.5 Mobile/8B111 Safari/6533.4.3"'
            },
            {
                id: 1,
                date: '2020-11-18',
                hostname: 'megento-web',
                statusCode: 200,
                message: '167.245.104.48 - - [18/Nov/2020:07:17:17 +0000] "GET /molo-owl-bag-across-body-bag-grey-flannel-m8553i00f-c11.html HTTP/2.0" 200 13325 "-" "Mozilla/5.0 (iPad; CPU OS 8_2_2 like Mac OS X; en-US) AppleWebKit/533.4.3 (KHTML, like Gecko) Version/3.0.5 Mobile/8B111 Safari/6533.4.3"'
            },
            {
                id: 1,
                date: '2020-11-18',
                hostname: 'megento-web',
                statusCode: 200,
                message: '167.245.104.48 - - [18/Nov/2020:07:17:17 +0000] "GET /molo-owl-bag-across-body-bag-grey-flannel-m8553i00f-c11.html HTTP/2.0" 200 13325 "-" "Mozilla/5.0 (iPad; CPU OS 8_2_2 like Mac OS X; en-US) AppleWebKit/533.4.3 (KHTML, like Gecko) Version/3.0.5 Mobile/8B111 Safari/6533.4.3"'
            },
            {
                id: 1,
                date: '2020-11-18',
                hostname: 'megento-web',
                statusCode: 200,
                message: '167.245.104.48 - - [18/Nov/2020:07:17:17 +0000] "GET /molo-owl-bag-across-body-bag-grey-flannel-m8553i00f-c11.html HTTP/2.0" 200 13325 "-" "Mozilla/5.0 (iPad; CPU OS 8_2_2 like Mac OS X; en-US) AppleWebKit/533.4.3 (KHTML, like Gecko) Version/3.0.5 Mobile/8B111 Safari/6533.4.3"'
            },
            {
                id: 1,
                date: '2020-11-18',
                hostname: 'megento-web',
                statusCode: 200,
                message: '167.245.104.48 - - [18/Nov/2020:07:17:17 +0000] "GET /molo-owl-bag-across-body-bag-grey-flannel-m8553i00f-c11.html HTTP/2.0" 200 13325 "-" "Mozilla/5.0 (iPad; CPU OS 8_2_2 like Mac OS X; en-US) AppleWebKit/533.4.3 (KHTML, like Gecko) Version/3.0.5 Mobile/8B111 Safari/6533.4.3"'
            }
        ];

        this.setState({data});
    }

    render() {
        const {data} = this.state;

        return (
            <div className="card">
                <CardHeader title={'Home Page'}/>
                <div className="card-body">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Hostname</th>
                                <th>Status Code</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.hostname}</td>
                                        <td>{item.statusCode}</td>
                                        <td>{item.message}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="card-footer">
                    Footer
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
