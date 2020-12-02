import React from 'react';
import PropTypes from 'prop-types';
import {Button} from './_button';
import {FilterDate, Input} from '.';
import '../../styles/component/_advanced-search.scss';

export default class AdvancedSearch extends React.Component {
    render() {
        const {onDateRangeChanged} = this.props;
        return (
            <div className="advanced-search col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-5">
                                <p>What are you looking for ? </p>
                                <Input
                                    className="input-search"
                                    type="search"
                                    placeholder="Seach for Host, IP, status, device, etc ..."
                                    aria-label="Search"
                                />
                            </div>
                            <div className="input-search col-12 col-md-4">
                                <p>Date Range </p>
                                <FilterDate
                                    className="d-inline"
                                    onDateRangeChanged={onDateRangeChanged}
                                />
                            </div>
                            <div className="col-12 col-md-3 btn-action-group">
                                <Button className="btn-search ml-2 w-100">SEARCH</Button>
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
