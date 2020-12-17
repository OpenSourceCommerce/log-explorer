import React, {Component} from 'react';
import 'admin-lte/plugins/jsgrid/demos/db';
import 'admin-lte/plugins/jsgrid/jsgrid.min';
import 'admin-lte/plugins/jsgrid/jsgrid.min.css';
import 'admin-lte/plugins/jsgrid/jsgrid-theme.min.css';
import PropTypes from 'prop-types';
import {Live, LogTableActions} from '../actions';
import {LogDetailSidebar} from '.';

export class JsGridTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
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
            pageIndex = 1,
            pageLoading = true,
            logview,
            dataType = 'json',
            autoload = true,
            paging = true,
            fields = []
        } = this.props;
        const that = this;
        const uuid = logview ? logview.uuid : null;
        const dataSrc = '/api/stream/' + LogTableActions.getUuid(uuid) + '/list';

        $(() => {
            $('#jsGrid1').jsGrid({
                height,
                width,

                autoload,
                paging,
                pageSize,
                pageButtonCount,
                pageIndex,
                pageLoading,

                controller: {
                    loadData(filter) {
                        filter = LogTableActions.getOptions(filter);
                        return $.ajax({
                            url: dataSrc,
                            data: filter,
                            dataType
                        });
                    }
                },

                rowClick: data => {
                    const {item} = data;
                    that.setState({selectedItem: item});
                },

                fields
            });

            if (liveRefresh) {
                Live.onRefresh(() => {
                    $('#jsGrid1').jsGrid('loadData');
                });
            }
        });
    }

    render() {
        const {selectedItem} = this.state;

        return (
            <>
                <div id="jsGrid1">
                    &nbsp;
                </div>
                {selectedItem && <LogDetailSidebar
                    item={selectedItem}
                    onCloseLogDetailSideBar={() => {
                        this.setState({selectedItem: null});
                    }}
                />}
            </>
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
    pageIndex: PropTypes.number,
    paging: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    autoload: PropTypes.bool
};
