import React, {Component} from 'react';
import 'admin-lte/plugins/jsgrid/demos/db';
import 'admin-lte/plugins/jsgrid/jsgrid.min';
import 'admin-lte/plugins/jsgrid/jsgrid.min.css';
import 'admin-lte/plugins/jsgrid/jsgrid-theme.min.css';
import PropTypes from 'prop-types';
import {Live, LogTableActions} from '../actions';

export class JsGridTable extends Component {
    componentDidMount() {
        const {
            height = '500px', width = '100%', pageSize = 30, pageButtonCount = 5, pageIndex = 1,
            pageLoading = true, dataSrc, dataType = 'json', autoload = true, paging = true, fields = []
        } = this.props;

        $(() => {
            $('#jsGrid1')
                .jsGrid({
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

                    fields
                });

            Live.onRefresh(() => {
                $('#jsGrid1').jsGrid('loadData');
            });
        });
    }

    render() {
        return (
            <div id="jsGrid1">
                &nbsp;
            </div>
        );
    }
}

JsGridTable.propTypes = {
    fields: PropTypes.array.isRequired,
    dataSrc: PropTypes.string.isRequired,
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
