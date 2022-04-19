import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {NavUser} from '.';
import PropTypes from 'prop-types';

class Navbar extends Component {
    componentDidMount(){
        $(document).ready(function () {
            $("#sidebarCollapse").on("click", () => {
                $(".wrapper").toggleClass("w-100");
            });
        });
    }
    render() {
        const {
            role,
            ...props
        } = this.props;

        return (
            <nav className="navbar navbar-expand navbar-light bg-white main-header">

                <div className="d-flex justify-content-between w-100 align-items-center">
                    <span className="nav-item collapse-icon rounded-circle p-2" id="sidebarCollapse" href="#">
                        <i data-feather="chevron-left"></i>
                    </span>
                    <NavUser {...props}/>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutLink: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
    changePasswordLink: PropTypes.string.isRequired,
    role: PropTypes.string
};

const root = document.querySelector('#navbar');
ReactDOM.render(<Navbar {...root.dataset}/>, root);
