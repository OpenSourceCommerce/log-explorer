import React, { Component } from 'react';
import { NavMenuItem } from './index';

export class NavMenu extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i
                            className="fas fa-bars"
                      />
                  </a>
              </li>
                <NavMenuItem title="Home" link="https://google.com.vn" />
                <NavMenuItem title="Contact" />
          </ul>
        );

    }

}
