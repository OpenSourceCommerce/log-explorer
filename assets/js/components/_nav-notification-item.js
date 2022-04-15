import React, {Component} from 'react';
import {Icon, Text, Link} from '.';
import PropTypes from 'prop-types';

export class NavNotificationItem extends Component {
    render() {
        const {href = '#', title = '', time = '', type = '', ...rest} = this.props;

        return (
            <Link href={href} className="dropdown-item" {...rest}>
                <Icon name={type} className="me-2"/>
                {title}
                <Text className="float-right text-muted text-sm">{time}</Text>
            </Link>
        );
    }
}

NavNotificationItem.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    type: PropTypes.string
};
