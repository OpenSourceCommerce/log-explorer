import React, {Component} from 'react';
import {Link, Icon} from '.';

export class NavThemeSetting extends Component {
    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link" data-widget="control-sidebar" data-slide="true"
                    role={'button'}>
                    <Icon name={'th-large'}/>
                </Link>
            </li>
        );
    }
}
