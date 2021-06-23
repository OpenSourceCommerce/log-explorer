import React, {Component} from 'react';
import 'admin-lte/plugins/jsgrid/demos/db';
import 'admin-lte/plugins/jsgrid/jsgrid.min';
import 'admin-lte/plugins/jsgrid/jsgrid.min.css';
import 'admin-lte/plugins/jsgrid/jsgrid-theme.min.css';
import PropTypes from 'prop-types';
import {Live, LogTableActions} from '../actions';
import {LogDetailSidebar, Icon, Input, Button} from '.';
import '../../styles/component/_js-grid-table.scss';

export class JsGridTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            pageIndex: 1,
            itemCount: 0,
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData(true);
    }

    componentDidUpdate(prevProps) {
        const {logview, fields} = this.props;
        const prevLogview = prevProps.logview;
        const prevFields = prevProps.fields;

        if (logview !== prevLogview || fields !== prevFields) {
            this.loadData();
        }
    }

    loadData(liveRefresh = false) {
        const {
            height = '500px',
            width = '100%',
            pageSize = 30,
            pageButtonCount = 5,
            pageLoading = true,
            logview,
            dataType = 'json',
            autoload = true,
            paging = true,
            fields = [],
            onDataLoaded = false,
            sorting = false
        } = this.props;
        const that = this;
        const uuid = logview ? logview.uuid : null;
        const dataSrc = '/api/stream/' + LogTableActions.getUuid(uuid) + '/list';

        $(() => {
            $('#jsGrid1').jsGrid({
                height,
                width,
                sorting,
                autoload,
                paging,
                pageSize,
                pageButtonCount,
                pageLoading,
                controller: {
                    loadData(filter) {
                        filter = LogTableActions.getOptions(filter);
                        return $.ajax({
                            url: dataSrc,
                            data: filter,
                            dataType,
                            success: (res) => {
                                if (onDataLoaded) {
                                    onDataLoaded(res);
                                }
                                that.setState({
                                    itemsCount: res.itemsCount,
                                })
                            }
                        });
                    }
                },

                rowClick: data => {
                    const {item} = data;
                    that.setState({selectedItem: item});
                },

                fields,

                onDataLoaded: function (args) {
                    $("#jsGrid1 th").css('white-space', 'nowrap').each(function (index) {
                        var currentWidth = $(this).width();
                        var maxLength = $(this).text().length;

                        $("#jsGrid1 tr").each(function (idx) {
                            maxLength = $(this).find("td").eq(index).text().length > maxLength ? $(this).find("td").eq(index).text().length : maxLength;
                        });
                        maxLength = maxLength * 10;

                        var $with = 'auto';
                        if (maxLength < currentWidth) {
                            $with = currentWidth.toString() + "px";
                        }
                        $(this).css("width", $with);
                        $("#jsGrid1 tr").each(function (i) {
                            $(this).find("td").eq(index).css("width", $with);
                        });
                    });
                },
            });

            if (liveRefresh) {
                Live.onRefresh(() => {
                    $('#jsGrid1').jsGrid('loadData');
                });
            }
        });
    }

    render() {
        const {selectedItem, pageIndex, itemsCount} = this.state;

        const {pageSize} = this.props;

        let maxPageNumber = 0;

        if (itemsCount && itemsCount > 0) {
            maxPageNumber = Math.floor(itemsCount / pageSize);
            if (itemsCount % pageSize > 0) {
                maxPageNumber++;
            }
        }
        ;

        const gotoPages = (pageIndex) => {
            this.setState({
                pageIndex: parseInt(pageIndex),
            });
            $("#jsGrid1").jsGrid("openPage", pageIndex);
        };

        return (
            <div className="js-grip-table">
                <div id="jsGrid1" className="jsGrid1">
                    &nbsp;
                </div>
                {selectedItem && <LogDetailSidebar
                    item={selectedItem}
                    onCloseLogDetailSideBar={() => {
                        this.setState({selectedItem: null});
                    }}
                />}
                {maxPageNumber && maxPageNumber > 1 && <div className="mt-2 pagination-cus">
                    <div className="d-flex align-items-center justify-content-center">
                        <Button className="border-0 p-button"
                                disabled={pageIndex === 1}
                                onClick={() => gotoPages(1)}
                        >
                            <Icon name="step-backward p-icon"></Icon>
                        </Button>
                        <Button className="border-0 p-button"
                                disabled={pageIndex === 1}
                                onClick={() => gotoPages(pageIndex - 1)}
                        >
                            <Icon name="chevron-left p-icon"></Icon>
                        </Button>
                        <Input className="p-2 input-page-number h-75 text-right pl-2"
                               type="number"
                               min="1"
                               max={maxPageNumber}
                               value={pageIndex + ''}
                               onChange={(e) => {
                                   let newIndex = e.target.value;
                                   if (parseInt(newIndex) > maxPageNumber) {
                                       newIndex = maxPageNumber;
                                   }
                                   gotoPages(newIndex);
                               }}
                        ></Input>
                        <p className="total-page m-0 p-2">/ {maxPageNumber} </p>
                        <Button className="border-0 p-button"
                                disabled={pageIndex === maxPageNumber}
                                onClick={() => gotoPages(pageIndex + 1)}
                        >
                            <Icon name="chevron-right p-icon"></Icon></Button>
                        <Button className="border-0 p-button"
                                disabled={pageIndex === maxPageNumber}
                                onClick={() => gotoPages(maxPageNumber)}>
                            <Icon name="step-forward p-icon"></Icon>
                        </Button>
                    </div>
                </div>}
            </div>
        );
    }
}

JsGridTable.propTypes = {
    fields: PropTypes.array.isRequired,
    logview: PropTypes.object,
    dataType: PropTypes.string,
    pageSize: PropTypes.number,
    pageLoading: PropTypes.bool,
    pageButtonCount: PropTypes.number,
    //pageIndex: PropTypes.number,
    paging: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    autoload: PropTypes.bool,
    onDataLoaded: PropTypes.func
};
