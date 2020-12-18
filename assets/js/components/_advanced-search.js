import React from 'react';
import PropTypes from 'prop-types';
import {Button} from './_button';
import {FilterDate, FilterText} from '.';
import '../../styles/component/_advanced-search.scss';
import {Live} from '../actions';

export class AdvancedSearch extends React.Component {
    render() {
        const {onDateRangeChanged} = this.props;
        return (
            <div className="advanced-search">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <FilterText
                                    label="What are you looking for ?"
                                    placeholder="status = 200 AND url LIKE '%product%'"
                                />
                            </div>
                            <div className="input-search col-12 col-md-4 mt-2 mt-md-0">
                                <FilterDate
                                    label="Date Range"
                                    onDateRangeChanged={onDateRangeChanged}
                                />
                            </div>
                            <div className="col-12 col-md-2 btn-action-group mt-4">
                                <Button className="btn-search w-100 mt-0 mt-md-2" onClick={() => Live.refresh()}>
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
    onDateRangeChanged: PropTypes.func
};
