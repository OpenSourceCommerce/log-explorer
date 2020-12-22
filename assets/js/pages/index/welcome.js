import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../../styles/pages/welcome.scss';
import {Icon, Button} from '../../components';

export class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createSampleDatabase: false,
            createSampleData: false
        };
    }

    copyToClipboard(e, str, id) {
        e.preventDefault();
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.append(el);
        el.select();
        document.execCommand('copy');
        el.remove();
        this.setState({
            [id]: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    [id]: false
                });
            }, 2000);
        });
    }

    componentDidMount() {
    }

    render() {
        const commandList = [{
            id: 'createSampleDatabase',
            command: 'php bin/console app:createsampledatabase'
        }, {
            id: 'createSampleData',
            command: 'php bin/console app:createsampledata'
        }];

        return (
            <div className="welcome-page row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body text-left col-md-8 offset-md-2 mt-5 mb-5">
                            <h1>Manage your data easily!</h1>
                            <p className="mt-3 mb-3">Welcome to Log-Explore. It look you does not
                                setup your system. To start you can follow
                                by</p>
                            <h4>Command console</h4>
                            <p>To quickly create sample table and sample data just run there
                                commands:</p>
                            {commandList.map((item, index) => {
                                return (
                                    <pre key={index}>
                                            <code id={item.id}
                                                  className="d-flex justify-content-between">
                                                <span className="mr-5 mr-md-0">{item.command}</span>
                                                <a className="copy-icon float-right tooltipContent"
                                                   onClick={e => this.copyToClipboard(e, item.command, item.id)}
                                                   href="#"
                                                >
                                                    <span
                                                        className="tooltiptext p-2 text-center position-absolute">
                                                        {this.state[item.id] ? 'Copy Success' : 'Copy to Clipboard!'}
                                                    </span>
                                                    <Icon name="copy" type="regular"
                                                          className="pr-3 pr-md-0"/>
                                                </a>
                                            </code>
                                        </pre>
                                );
                            })}

                            <h4>Application</h4>
                            <p>Or if you want to create table by yourself just click <a href="/table">here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<WelcomePage/>, document.querySelector('#welcome-page'));
