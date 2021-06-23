import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlSidebar as ControlSidebar_} from 'admin-lte/dist/js/adminlte';
import {Link, Icon, Colors, Button} from '.';
import '../../styles/component/_control-sidebar.scss';

export class ControlSidebar extends Component {
    close(event) {
        event.preventDefault();

        $(() => {
            $('.control-sidebar').ControlSidebar('hide');
        });
    }

    render() {
        let {className = '', theme = 'dark', item, title = '',
            children, visible = false, onCloseLogDetailSideBar,
            headerActions,
            ...rest} = this.props;
        className += ` control-sidebar control-sidebar-${theme}`;

        if (Array.isArray(children)) {
            children = children.map((child, index) => {
                if (typeof child === 'string') {
                    child = <span key={index}>{child}</span>;
                }

                return child;
            });
        }

        $(() => {
            if (visible) {
                $('.control-sidebar').ControlSidebar('show');
            } else {
                $('.control-sidebar').ControlSidebar('hide');
            }
        });

        return (
            <aside className={className} {...rest}>
                <div className="card-header d-flex justify-content-around">
                    {headerActions && <div className={'btn-group control-sidebar-header-actions'}>
                        <Button type={'button'}
                                color={Colors.light}
                                className={'dropdown-toggle dropdown-icon btn-sm'}
                                data-toggle={'dropdown'}/>
                        <div className="dropdown-menu">
                            {headerActions}
                        </div>
                    </div>}
                    <h3 className="text-center ml-auto">{title}</h3>
                    <Link className={'ml-auto mr-2'}
                        href="#" onClick={event => {
                            this.close(event);
                            if (onCloseLogDetailSideBar) {
                                onCloseLogDetailSideBar();
                            }
                        }}>
                        <Icon name={'times'}/>
                    </Link>
                </div>
                <div className="card-body">
                    {children}
                </div>
            </aside>
        );
    }
}

ControlSidebar.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    visible: PropTypes.bool,
    item: PropTypes.object,
    onCloseLogDetailSideBar: PropTypes.func,
    headerActions: PropTypes.any,
};
