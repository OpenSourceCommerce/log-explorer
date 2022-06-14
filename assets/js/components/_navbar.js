import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {NavUser,Icon} from '.';
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
            <nav className="navbar navbar-expand navbar-light bg-white main-header ps-cp-4">
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <span className="nav-item collapse-icon rounded-circle p-2" id="sidebarCollapse" href="#">
                        <Icon dataFeather="chevron-left" />
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
