import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlSidebar} from '.';

export class LogDetailSidebar extends Component {
    render() {
        const {item} = this.props;

        // Create label for detail log
        const dataDisplay = Object.entries(item).map(([key, value]) => {
            const words = key.split('_').map((item, index) => {
                if (index === 0) {
                    return item.charAt(0).toUpperCase() + item.slice(1);
                }

                return item;
            });
            return {
                label: words.join(' '),
                value
            };
        });

        return (
            <ControlSidebar
                className={`log-detail-sidebar overflow-auto ${item ? 'open' : 'close'} w-25`}
                title={'Detail'}
                visible={true}
                {...this.props}
            >
                <ul className="p-0">
                    {dataDisplay.map((item, index) => (
                        <div
                            key={index}>
                            <h5>{item.label}</h5>
                            <p>
                                {item.value || 'No data'}
                            </p>
                        </div>
                    ))}
                </ul>
            </ControlSidebar>
        );
    }
}

LogDetailSidebar.propTypes = {
    item: PropTypes.object.isRequired
};
