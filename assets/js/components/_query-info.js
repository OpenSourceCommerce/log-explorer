import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class QueryInfo extends Component {
    formatBytes(bytes, decimals = 2) {
        bytes = parseInt(bytes);
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    formatTime(time) {
        if (time > 1000) {
            return (time / 1000).toFixed(1) + ' seconds';
        } else {
            return time + ' milliseconds';
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        let {className = '', queryInfo = {}} = this.props;
        const {total = 0, current = 0, queryTime = 0, queryReadRows = 0, queryReadBytes = 0, queryResultBytes = 0, queryMemory = 0} = queryInfo;

        return (
            <div className={className}>
                {this.numberWithCommas(total)} hits, query time {this.formatTime(queryTime)}.
            </div>
        );
    }
}

QueryInfo.propTypes = {
    className: PropTypes.string,
    queryInfo: PropTypes.object
};
