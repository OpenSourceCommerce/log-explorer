import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlSidebar as ControlSidebar_} from 'admin-lte/dist/js/adminlte';
import {Link, Icon} from '.';

export class ControlSidebar extends Component {
    close(event) {
        event.preventDefault();

        $(() => {
            const $ControlSidebar = new ControlSidebar_($('.control-sidebar'), {});
            $ControlSidebar.collapse();
        });
    }

    render() {
        let {className = '', theme = 'dark', item, title = '', children, visible = false, ...rest} = this.props;
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
            const $ControlSidebar = new ControlSidebar_($('.control-sidebar'), {});
            $ControlSidebar._init();

            if (visible) {
                $ControlSidebar.show();
            } else {
                $ControlSidebar.collapse();
            }
        });

        return (
            <aside className={className} {...rest}>
                <Link className={'float-right mr-2'} href="#" onClick={this.close}>
                    <Icon name={'times'}/>
                </Link>

                <h3>{title}</h3>

                <div className="p-3">
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
    item: PropTypes.object
};
