import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/component/_status.scss';

export default class StatusWidget extends React.Component {
    render() {
        const {data} = this.props;

        return (
            <ul className="status-widget pe-3 ps-3">
                {data.map((item, key) => {
                    const {label, value} = item;
                    let dotColor = '';

                    if (label > 0 && label < 200) {
                        dotColor = 'btn-info';
                    } else if (label < 300) {
                        dotColor = 'btn-success';
                    } else if (label < 400) {
                        dotColor = 'btn-primary';
                    } else if (label < 500) {
                        dotColor = 'btn-warning';
                    } else if (label < 600) {
                        dotColor = 'btn-danger';
                    }

                    return (
                        <li key={key} className="d-flex justify-content-between pb-2">
                            <div className="d-inline-flex">
                                <span className={`dot mt-2 me-2 ${dotColor}`}/>
                                {label}
                            </div>
                            <div>{value}</div>
                        </li>
                    );
                }
                )}
            </ul>
        );
    }
}

StatusWidget.propTypes = {
    data: PropTypes.array
};
