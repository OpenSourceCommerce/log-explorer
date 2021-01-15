import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class QueryInfo extends Component {
    render() {
        let {className = '', queryInfo = {}} = this.props;
        const {total = 0, current = 0, queryTime = 0, queryReadRows = 0, queryReadBytes = 0, queryResultBytes = 0, queryMemory = 0} = queryInfo;

        return (
            <div className={className}>
                Return {current} rows of {total} rows in {queryTime} milliseconds. Read {queryReadRows} rows with {queryReadBytes} bytes, result {queryResultBytes} bytes, used {queryMemory} bytes of memory.
            </div>
        );
    }
}

QueryInfo.propTypes = {
    className: PropTypes.string,
    queryInfo: PropTypes.object
};
