import React, {Component} from 'react';
import PropTypes from 'prop-types';
export class CounterSum extends Component {
    render() {
        const {className, data} = this.props;

        const numberConverter = data ? data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

        return (
            <>
                <div
                    className={`${className} text-center h-100 d-flex flex-column justify-content-center align-self-center`}>
                    <h1 className="font-weight-bold mb-0">{numberConverter}</h1>
                </div>
            </>
        );
    }
}

CounterSum.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.string
};
