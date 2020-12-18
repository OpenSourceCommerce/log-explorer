import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class WidgetTable extends Component {
    render() {
        const {data} = this.props;
        return (
            <div className="widget-table">
                {data.map((item, index) => {
                    const {label, value} = item;
                    return (<div className="row widget-table-row pt-3 pb-3 mr-4 ml-4" key={index}>
                        <div className="label-col col-10 p-0">{label}</div>
                        <div className="value-col col-2 text-right pl-0">{value}</div>
                    </div>);
                })}
            </div>
        );
    }
}

WidgetTable.propTypes = {
    data: PropTypes.array
};
