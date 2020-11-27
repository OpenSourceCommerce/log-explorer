import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlSidebar} from '.';

export class LogDetailSidebar extends Component {
    render() {
        const {item} = this.props;

        return (
            <ControlSidebar title={'Detail'} item={item} visible={true}>
                <dl>
                    <dt>Host</dt>
                    <dd>{item.host}</dd>
                    <dt>Ip</dt>
                    <dd>{item.ip}</dd>
                    <dt>Status</dt>
                    <dd>{item.status}</dd>
                    <dt>Timestamp</dt>
                    <dd>{item.timestamp}</dd>
                    <dt>Url</dt>
                    <dd>{item.url}</dd>
                    <dt>User Agent</dt>
                    <dd>{item.user_agent}</dd>
                    <dt>Referer</dt>
                    <dd>{item.referer}</dd>
                </dl>
            </ControlSidebar>
        );
    }
}

LogDetailSidebar.propTypes = {
    item: PropTypes.object.isRequired
};
