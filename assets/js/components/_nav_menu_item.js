import React, { Component } from 'react';

export class NavMenuItem extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        const { title, link = '#', classes = '' } = this.props;

        const className = `nav-link ${classes}`;

        return (
            <li className="nav-item d-none d-sm-inline-block">
                <a href={link} className={className} {...this.props}>{title}</a>
          </li>
        );

    }

}
