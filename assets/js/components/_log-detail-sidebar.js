import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlSidebar, Link } from '.';

export class LogDetailSidebar extends Component {
    copyToClipboard(e, type) {
        e.preventDefault();
        const {item} = this.props;
        let content = '';

        switch (type) {
            case 'csv':
                let headers = '';
                Object.entries(item).map(([key, value]) => {
                    if (headers.length > 0) {
                        headers += ',';
                    }
                    headers += `\"${key}\"`;

                    if (content.length > 0) {
                        content += ',';
                    }

                    if (isNaN(value)) {
                        content += `\"${value}\"`;
                    } else {
                        content += value;
                    }
                });
                content = headers + '\r\n' + content;
                break;
            case 'json':
                content = JSON.stringify(item);
                break;
            default:
                return;
        }

        const el = document.createElement('textarea');
        el.value = content;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.append(el);
        el.select();
        document.execCommand('copy');
        el.remove();
    }

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
                value,
            };
        });

        return (
            <ControlSidebar
                className={`log-detail-sidebar overflow-auto ${item ? 'open' : 'close'}`}
                title={'Detail'}
                visible={true}
                {...this.props}
                headerActions={
                    <>
                        <Link onClick={e => this.copyToClipboard(e, 'csv')}
                              className={'dropdown-item'} href={'#'}>Copy as CSV</Link>
                        <Link onClick={e => this.copyToClipboard(e, 'json')}
                              className={'dropdown-item'} href={'#'}>Copy as JSON</Link>
                    </>
                }
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
    item: PropTypes.object.isRequired,
};
