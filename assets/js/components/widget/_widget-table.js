import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../../styles/component/_widget-table.scss';

export class WidgetTable extends Component {
    render() {
        const {data, isDashboardComponent, column} = this.props;

        const Row = ({label, value, isHeader}) => (
            <div
                className={`${!isHeader ? 'border-top widget-table-row' : 'widget-table-header'} row pt-2 pb-2 mr-4 ml-4`} >
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
                {data && data.length > 0 ? <div className="overflow-auto">
                    {(isDashboardComponent) && <Row label={column ||  '<Select column name>'} isHeader={isDashboardComponent}/>}
                    <div className="widget-table-content">
                        {data.map((item, index) => {
                            return <Row {...item}
                                        key={index}
                            />
                        })}
                    </div>
                </div> : <p className="d-flex justify-content-center p-3"> No data </p>}
            </>
        );
    }
}

WidgetTable.propTypes = {
    data: PropTypes.array,
    widgetHeader: PropTypes.string,
    isDashboardComponent: PropTypes.bool
};
