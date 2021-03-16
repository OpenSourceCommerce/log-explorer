import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WidgetHeader} from "./_widget-header";

export class WidgetTable extends Component {
    render() {
        const {data, isDashboardComponent, widgetHeader} = this.props;

        const Row = ({label, value, isHeader}) => (
            <div
                className={`${!isHeader ? 'border-top' : ''} row widget-table-row pt-2 pb-2 mr-4 ml-4`}>
                <div
                    className={`label-col col-8 p-0 ${isHeader ? 'font-weight-bold' : ''}`}>{label}</div>
                <div
                    className={`value-col col-4 text-right pl-0 ${isHeader ? 'font-weight-bold' : ''}`}>{!isHeader ? value : 'Count'}</div>
            </div>
        )

        return (
            <>
                {data && data.length > 0 ? <>
                    {(widgetHeader || isDashboardComponent) && (
                        <>
                            <WidgetHeader header={widgetHeader}/>
                            <Row label={Object.keys(data[0])[0]} isHeader={isDashboardComponent}/>
                        </>)
                    }
                    <div className="widget-table">
                        {data.map((item, index) => {
                            return <Row {...item}
                                        key={index}
                            />
                        })}
                    </div>
                </> : <p> No data display </p>}
            </>
        );
    }
}

WidgetTable.propTypes = {
    data: PropTypes.array,
    widgetHeader: PropTypes.string,
    isDashboardComponent: PropTypes.bool
};
