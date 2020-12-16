import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Text, Link, Image, Icon} from '.';
import Logo from '../../images/logo.svg';
import userImage from '../../images/user1-128x128.jpg';

export class Sidebar extends Component {
    render() {
        const navList = [
            {href: '', type: 'regular', iconName: 'circle', label: 'Dashboard'},
            {href: 'database', type: 'solid', iconName: 'database', label: 'Database'}
        ];

        const featureName = window.location.pathname.split('/');

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
                            {navList.map((item, index) => {
                                const {href, type, iconName, label} = item;
                                return (<li className="nav-item" key={index}>
                                    <Link href={`/${href}`} className={`nav-link ${href === featureName[1] ? 'active' : ''}`}>
                                        <Icon name={iconName} type={type}
                                            className="nav-icon"/>
                                        <p>{label}</p>
                                    </Link>
                                </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>

        );
    }
}

ReactDOM.render(<Sidebar/>, document.querySelector('#sidebar'));
