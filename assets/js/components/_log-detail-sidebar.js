import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlSidebar} from '.';
import '../../styles/component/_log-detail-sidebar.scss';

export class LogDetailSidebar extends Component {
    render() {
        const {item} = this.props;

        //If you wanna remove or add any field that you wanna display in Log detail sidebar, just remove or add object in array below
        const dataDisplay = [
            {label: 'Host', key: 'host'},
            {label: 'Ip', key: 'ip'},
            {label: 'Status', key: 'status'},
            {label: 'Timestamp', key: 'timestamp'},
            {label: 'Url', key: 'url'},
            {label: 'User Agent', key: 'user_agent'},
            {label: 'Referer', key: 'referer'},
        ]

        return (
            <ControlSidebar className={`log-detail-sidebar overflow-auto ${item ? 'open' : 'close'}`} title={'Detail'} item={item}
                            visible={true}>
                <ul>
                    {dataDisplay.map((detail, index) => {
                        return <ViewMoreComponent label={detail.label} data={item[detail.key]}
                                                  key={index} index={index}/>
                    })}
                </ul>
            </ControlSidebar>
        );
    }
}

LogDetailSidebar.propTypes = {
    item: PropTypes.object.isRequired
};


function ViewMoreComponent({label, data, index}) {
    return (
        <a role="button" className="collapsed" data-toggle="collapse" href={`#collapse${index}`}
           aria-expanded="false" aria-controls={`collapse${index}`}>
                <h4>{label}</h4>
            <p className="collapse" id={`collapse${index}`} aria-expanded="false">
                {data || 'No data'}
            </p>
        </a>
    )
}
