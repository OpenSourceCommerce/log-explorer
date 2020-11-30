import React from 'react';
import PropTypes from 'prop-types';
import {Button} from './_button';
import {FilterDate, Input} from './index';

export default class AdvancedSearch extends React.Component {
    render() {
        const { onDateRangeChanged } = this.props;
        return (
            <div className="advanced-search col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <p>What are you looking for ? </p>
                            </div>
                            <div className="input-search col-12 col-md-3">
                                <p>Date Range </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-search col-12 col-md-6">
                                <Input
                                    className="input-search"
                                    type="search"
                                    placeholder="Seach for Host, IP, status, device, etc ..."
                                    aria-label="Search"
                                />
                            </div>
                            <div className="input-search col-12 col-md-3">
                                <FilterDate
                                    className="d-inline"
                                    onDateRangeChanged={onDateRangeChanged}
                                />
                            </div>
                            <div className="col-12 col-md-3 row">
                                <div className="col-2">
                                    <button className="btn btn-outline-primary"><i className="fas fa-chevron-down"></i></button>
                                </div>
                                <Button className="col-10">SEARCH</Button>
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
