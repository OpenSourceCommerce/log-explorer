import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class WidgetTable extends Component {
    render() {
        const {data, isDashboardComponent, column} = this.props;

        const Row = ({label, value, isHeader}) => (
            <div
                className={`${!isHeader ? 'border-top' : ''} row widget-table-row pt-2 pb-2 mr-4 ml-4`} >
                <a
                    className={`label-col col-8 p-0`} onMouseDown={(event) => {
                    event.stopPropagation();
                }}>{label || ''}</a>
                <div
                    className='value-col col-4 text-right pl-0'>{!isHeader ? value : 'Count'}</div>
            </div>
        )

        return (
            <>
                {data && data.length > 0 ? <>
                    {(isDashboardComponent) && <Row label={column ||  '<Select column name>'} isHeader={isDashboardComponent}/>}
                    <div className="widget-table">
                        {data.map((item, index) => {
                            return <Row {...item}
                                        key={index}
                            />
                        })}
                    </div>
                </> : <p className="d-flex justify-content-center p-3"> No data </p>}
            </>
        );
    }
}

WidgetTable.propTypes = {
    data: PropTypes.array,
    widgetHeader: PropTypes.string,
    isDashboardComponent: PropTypes.bool
};
