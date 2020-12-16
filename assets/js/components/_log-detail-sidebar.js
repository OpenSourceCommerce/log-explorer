import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlSidebar} from '.';

export class LogDetailSidebar extends Component {
    render() {
        const {item} = this.props;

        // If you wanna remove or add any field that you wanna display in Log detail sidebar, just remove or add object in array below
        const dataDisplay = [
            {label: 'Host', key: 'host'},
            {label: 'Ip', key: 'ip'},
            {label: 'Status', key: 'status'},
            {label: 'Timestamp', key: 'timestamp'},
            {label: 'Url', key: 'url'},
            {label: 'User Agent', key: 'user_agent'},
            {label: 'Referer', key: 'referer'}
        ];

        return (
            <ControlSidebar
                className={`log-detail-sidebar overflow-auto ${item ? 'open' : 'close'} w-25`}
                title={'Detail'}
                visible={true}
                {...this.props}
            >
                <ul className="p-0">
                    {dataDisplay.map((detail, index) => {
                        return <div
                            key={index}>
                            <h5>{detail.label}</h5>
                            <p>
                                {item[detail.key] || 'No data'}
                            </p>
                        </div>;
                    })}
                </ul>
            </ControlSidebar>
        );
    }
}

LogDetailSidebar.propTypes = {
    item: PropTypes.object.isRequired
};
