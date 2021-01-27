import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from "../_input";
import {WidgetHeader} from "../index";

export class CounterSum extends Component {
    render() {
        const {className, data, widgetHeader} = this.props;

        const numberConverter = data[0].value ? data[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

        return (
            <>
                <WidgetHeader header={widgetHeader}/>
                <div
                    className={`${className} text-center h-100 d-flex flex-column justify-content-center align-self-center`}>
                    <h1 className="font-weight-bold mb-0">{numberConverter}</h1>
                    {
                        data[0].label ? <p className="mb-0">{data[0].label}</p> :
                            <Input className="text-center" placeholder="Name"/>
                    }
                </div>
            </>
        );
    }
}

CounterSum.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.array
};
