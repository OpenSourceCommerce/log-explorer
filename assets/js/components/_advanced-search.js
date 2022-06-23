import React from "react";
import PropTypes from "prop-types";
import { FilterDate, FilterText, Button, LogViewList } from ".";
import "../../styles/component/_advanced-search.scss";
import { Live } from "../actions";

export class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);
        this.filterDateRef = React.createRef();
    }

    setDate(from, to, dateValue, callback) {
        this.filterDateRef.current.setDate(from, to, dateValue, callback);
    }

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
            <div className="advanced-search p-3 my-2">
                <div className="d-flex justify-content-around align-self-center flex-wrap">
                    <LogViewList className="me-3" {...otherProps} />
                    <div className="d-flex flex-column flex-fill me-2">
                        <FilterText
                            label="What are you looking for ?"
                            placeholder="status = 200 AND url LIKE '%product%'"
                            queries={queries}
                            onSaveClicked={onSaveClicked}
                            onDeleteCLicked={onDeleteCLicked}
                        />
                    </div>
                    <FilterDate
                        className="me-2"
                        ref={this.filterDateRef}
                        label="Date Range"
                        dateRange={dateRange}
                        onDateRangeChanged={onDateRangeChanged}
                    />
                    <Button
                        id="btn-search"
                        className="btn-search flex-fill align-self-end"
                        onClick={() => Live.refresh()}
                    >
                        Search
                    </Button>
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
