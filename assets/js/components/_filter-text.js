import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Input, Link, NavDivider, NavNotificationItem, Text} from '.';
import {Live, Event} from '../actions';
import {Button} from "./_button";
import {Dropdown} from "../../../public/build/theme/js/build/js/AdminLTE";

export class FilterText extends Component {
    constructor(props) {
        super(props);

        let {value} = this.props;
        if (!value) {
            value = '';
        }
        this.state = {
            isInvalid: false,
            value,
            query: null,
        };
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSaveClicked = this.onSaveClicked.bind(this);
    }

    componentDidMount() {
        const that = this;
        Event.bus.register(Event.RESPONSE_ERROR, response => {
            const {error, filter} = response;
            if (error === Event.ERROR_INVALID_QUERY) {
                const {value} = that.state;
                if (value === filter) {
                    that.setState({
                        isInvalid: true
                    });
                }
            }
        });
    }

    handleChange(e) {
        this.setState({
            value: e && e.target ? e.target.value : '',
            isInvalid: false
        });
    }

    onKeyUp(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            Live.refresh();
        }
    }

    setQuery(query) {
        this.setState({
            value: query.query,
            query: query
        }, () => {
            Live.refresh();
        })
    }

    onSaveClicked(item = false) {
        let {query, value} = this.state;
        const {queries, onSaveClicked} = this.props;

        if (item) {
            onSaveClicked(item);
            return;
        }

        if (query) {
            if (query.query === $.trim(value)) {
                return;
            }
        }

        query = {
            query: value,
            name: '',
            id: null
        }

        onSaveClicked(query);
    }

    render() {
        const {placeholder, label, queries, ...rest} = this.props;
        const {isInvalid, value} = this.state;
        let className = `${this.props.className} input-search`;
        if (isInvalid) {
            className += ' is-invalid';
        }

        return (
            <>
                {label &&  <p className="float-left mb-1">{label}</p>}
                <div className='input-group'>
                    <Input
                        className={`form-group ${className}`}
                        id="filter-text"
                        type="search"
                        name="query"
                        value={value}
                        placeholder={placeholder}
                        aria-label="Search"
                        onKeyUp={this.onKeyUp}
                        onChange={this.handleChange}
                        onBlur={(e) => {
                            const {onBlur} = this.props;
                            if (onBlur) onBlur(e);
                        }}
                    />
                    <div className='input-group-append'>
                        <Link className="btn btn-info" data-toggle="dropdown">
                            <Icon name="chevron-down"/>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            {queries.length === 0 && <>
                                <Link className="dropdown-item dropdown-footer">
                                    No item saved
                                </Link>
                            </>}
                            {queries.map((query, key) => {
                                return <div key={key}>
                                    <div
                                        className="dropdown-item dropdown-footer"
                                    >
                                        <Link onClick={(e) => {e.preventDefault();this.setQuery(query)}}>{query.name}</Link>
                                        <Link className={'float-right'} onClick={(e) => {e.preventDefault();this.onSaveClicked(query)}}>
                                            <i className={'fa fa-edit'}></i>
                                        </Link>
                                    </div>
                                    <NavDivider/>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='input-group-append'>
                        <Button
                            className='btn-success'
                            onClick={(e) => {e.preventDefault();this.onSaveClicked()}}
                        >Save</Button>
                    </div>
                </div>
            </>
        );
    }
}

FilterText.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSaveClicked: PropTypes.func,
    queries: PropTypes.array
};
