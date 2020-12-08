import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Text, Link, Image, Icon} from '.';
import Logo from '../../images/logo.svg';
import userImage from '../../images/user1-128x128.jpg';

export class Sidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link className="brand-link" href={'/'}>
                    <Image src={Logo} alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                        style={{opacity: '.8'}}/>
                    <Text className="brand-text font-weight-light">
                        Scale.sc
                    </Text>
                </Link>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <Image src={userImage} className="img-circle elevation-2"
                                alt="User Image"/>
                        </div>
                        <div className="info">
                            <Link className={'d-block'}>Alexander Pierce</Link>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview"
                            role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link href="/" className="nav-link active">
                                    <Icon name={'circle'} type={'regular'}
                                          className="nav-icon"/>
                                    <p>Dashboard v1</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/database" className="nav-link">
                                    <Icon name={'database'} type={'regular'}
                                          className="nav-icon"/>
                                    <p>Database view</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/database/query" className="nav-link">
                                    <Icon name={'database'} type={'regular'}
                                          className="nav-icon"/>
                                    <p>Database query</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

        );
    }
}

ReactDOM.render(<Sidebar/>, document.querySelector('#sidebar'));
