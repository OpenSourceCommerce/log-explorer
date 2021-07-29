import React from 'react';
import PropTypes from 'prop-types';
import {FilterDate, FilterText, Button, LogViewList} from '.';
import '../../styles/component/_advanced-search.scss';
import {Live} from '../actions';

export class AdvancedSearch extends React.Component {
    render() {
        const {
            onDateRangeChanged,
            dateRange,
            queries,
            onSaveClicked,
            onDeleteCLicked,
            ...otherProps
        } = this.props;
        return (
            <div className="advanced-search">
                <div className="card mb-2">
                    <div className="card-body pt-0 pb-1">
                        <LogViewList
                            {...otherProps}
                        />
                        <div className="row ">
                            <div className="col-7 col-md-6">
                                <FilterText
                                    label="What are you looking for ?"
                                    placeholder="status = 200 AND url LIKE '%product%'"
                                    queries={queries}
                                    onSaveClicked={onSaveClicked}
                                    onDeleteCLicked={onDeleteCLicked}
                                />
                            </div>
                            <div className="input-search col-5 col-md-4">
                                <FilterDate
                                    label="Date Range"
                                    dateRange={dateRange}
                                    onDateRangeChanged={onDateRangeChanged}
                                />
                            </div>
                            <div className="col-12 col-md-2 btn-action-group mt-2 mt-md-4">
                                <Button className="btn-search w-100" onClick={() => Live.refresh()}>
                                    SEARCH
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AdvancedSearch.propTypes = {
    onDateRangeChanged: PropTypes.func,
    onSaveClicked: PropTypes.func,
    onDeleteCLicked: PropTypes.func,
    dateRange: PropTypes.object,
    queries: PropTypes.array,
};
