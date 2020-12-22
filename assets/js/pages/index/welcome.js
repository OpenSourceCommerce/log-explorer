import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../../styles/pages/welcome.scss';
import {Icon} from '../../components';

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
        const userCommandList = [{
            id: 'createUser',
            command: 'php bin/console app:createuser',
            description: 'Description:\n' +
                '  This command used to create system user\n' +
                '\n' +
                'Usage:\n' +
                '  app:createuser [options] [--] <email>\n' +
                '\n' +
                'Arguments:\n' +
                '  email                      User email\n' +
                '\n' +
                'Options:\n' +
                '  -p, --password=PASSWORD    User password\n' +
                '  -f, --firstname=FIRSTNAME  User first name\n' +
                '  -l, --lastname=LASTNAME    User last name\n' +
                '      --user                 Create normal user, default is ADMIN\n' +
                '  -h, --help                 Display this help message\n' +
                '  -q, --quiet                Do not output any message\n' +
                '  -V, --version              Display this application version\n' +
                '      --ansi                 Force ANSI output\n' +
                '      --no-ansi              Disable ANSI output\n' +
                '  -n, --no-interaction       Do not ask any interactive question\n' +
                '  -e, --env=ENV              The Environment name. [default: "dev"]\n' +
                '      --no-debug             Switches off debug mode.\n' +
                '  -v|vv|vvv, --verbose       Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
        }];
        const dataCommandList = [{
            id: 'createSampleDatabase',
            command: 'php bin/console app:createsampledatabase',
            description: 'Description:\n' +
                '  This command used to create the sample database at ClickHouse\n' +
                '\n' +
                'Usage:\n' +
                '  app:createsampledatabase\n' +
                '\n' +
                'Options:\n' +
                '  -h, --help            Display this help message\n' +
                '  -q, --quiet           Do not output any message\n' +
                '  -V, --version         Display this application version\n' +
                '      --ansi            Force ANSI output\n' +
                '      --no-ansi         Disable ANSI output\n' +
                '  -n, --no-interaction  Do not ask any interactive question\n' +
                '  -e, --env=ENV         The Environment name. [default: "dev"]\n' +
                '      --no-debug        Switches off debug mode.\n' +
                '  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
        }, {
            id: 'createSampleData',
            command: 'php bin/console app:createsampledata',
            description: 'Description:\n' +
                '  Create sample data\n' +
                '\n' +
                'Usage:\n' +
                '  app:createsampledata [options] [--] <number>\n' +
                '\n' +
                'Arguments:\n' +
                '  number                Number of row in database\n' +
                '\n' +
                'Options:\n' +
                '      --date=DATE       At date [default: "2020-12-22"]\n' +
                '      --time=TIME       At special time\n' +
                '  -h, --help            Display this help message\n' +
                '  -q, --quiet           Do not output any message\n' +
                '  -V, --version         Display this application version\n' +
                '      --ansi            Force ANSI output\n' +
                '      --no-ansi         Disable ANSI output\n' +
                '  -n, --no-interaction  Do not ask any interactive question\n' +
                '  -e, --env=ENV         The Environment name. [default: "dev"]\n' +
                '      --no-debug        Switches off debug mode.\n' +
                '  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
        }, {
            id: 'streamSampleData',
            command: 'php bin/console app:streamsampledata',
            description: 'Description:\n' +
                '  Add sample data\n' +
                '\n' +
                'Usage:\n' +
                '  app:streamsampledata <number>\n' +
                '\n' +
                'Arguments:\n' +
                '  number                Number of request per-minute\n' +
                '\n' +
                'Options:\n' +
                '  -h, --help            Display this help message\n' +
                '  -q, --quiet           Do not output any message\n' +
                '  -V, --version         Display this application version\n' +
                '      --ansi            Force ANSI output\n' +
                '      --no-ansi         Disable ANSI output\n' +
                '  -n, --no-interaction  Do not ask any interactive question\n' +
                '  -e, --env=ENV         The Environment name. [default: "dev"]\n' +
                '      --no-debug        Switches off debug mode.\n' +
                '  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
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
                            <h4>Command to create user</h4>
                            <p>First, to create your account please use this command</p>
                            {userCommandList.map((item, index) => {
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
                                        <code>
                                            {item.description}
                                        </code>
                                    </pre>
                                );
                            })}
                            <h4>Command console</h4>
                            <p>To quickly create sample table and sample data just run there
                                commands:</p>
                            {dataCommandList.map((item, index) => {
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
                                        <code>
                                            {item.description}
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
