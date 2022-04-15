import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../../styles/component/_widget-table.scss';

export class WidgetTable extends Component {
    render() {
        const {data, isDashboardComponent, column, onLabelClicked} = this.props;

        const Row = ({label, value, isHeader, onLabelClicked, ...children}) => {
            if (isHeader) {
                let labels = label

                if (typeof label === 'string') {
                    labels = label.split(',')
                }

                return (
                    <div
                        className="widget-table-header row pt-2 pb-2 mr-4 ml-4">
                        {labels && labels.map((item, key) => {
                            return (

                                <a key={key}
                                   className={`label-col col p-0`}
                                   onMouseDown={(event) => {
                                       event.stopPropagation();
                                   }}>
                                    {item || ''}
                                </a>

                            )
                        })}
                        <div
                            className='value-col col-4 col-md-2 text-right pl-0 text-nowrap'>
                            Count
                        </div>
                    </div>
                )
            }

            return (
                <div
                    className="border-top widget-table-row row pt-2 pb-2 mr-4 ml-4">
                    {children && Object.keys(children).map((item, key) => {
                        return (
                            <a key={key}
                               className={`label-col col p-0`}
                               onMouseDown={(event) => {
                                   event.stopPropagation();
                               }}
                               onClick={() => {
                                   onLabelClicked(children[item], item)
                               }}>
                                {children[item] || ''}
                            </a>
                        )
                    })}

                    {label && <a className={`label-col col p-0`}
                                 onMouseDown={(event) => {
                                     event.stopPropagation();
                                 }}
                                 onClick={() => {
                                     onLabelClicked(label, column)
                                 }}>
                        {label}
                    </a>}
                    <div
                        className='value-col col-4 col-md-2 text-right pl-0'>{value}</div>
                </div>
            )
        }

        return (
            <>
                {data && data.length > 0 ? <div className="overflow-auto">
                    {(isDashboardComponent) &&
                    <Row label={column || '<Select column name>'} isHeader={isDashboardComponent}/>}
                    <div className="widget-table-content">
                        {data.map((item, index) => {
                            return <Row {...item}
                                        key={index}
                                        onLabelClicked={onLabelClicked}
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
    isDashboardComponent: PropTypes.bool,
    onLabelClicked: PropTypes.func
};
