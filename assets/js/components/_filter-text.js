import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Input, Link, NavDivider} from '.';
import {Live, Event} from '../actions';
import {Button} from "./_button";
import "../../styles/component/_filter-text.scss";

const QUERY_TIPS = (<ul>
    <li>We recommend <code className="highlighter-rouge">toString(timestamp)</code> when search <code className="highlighter-rouge">timestamp</code> field.</li>
</ul>)

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
        let isInvalidData = this.state.isInvalid
        Event.bus.register(Event.RESPONSE_ERROR, response => {
            const {error, filter} = response;
            if (error === Event.ERROR_INVALID_QUERY) {
                const {value} = that.state;
                if (value === filter) {
                    isInvalidData = true;
                }
            }
        });
        this.setState({
            isInvalid: isInvalidData
        })
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
        const {placeholder, label, queries, onDeleteCLicked, ...rest} = this.props;
        const {isInvalid, value} = this.state;
        let className = `${this.props.className} input-search`;
        if (isInvalid) {
            className += ' is-invalid';
        }

        return (
            <>
                {label && <div className="title-info align-items-center">
                    <p className="float-left mb-1 mr-2">{label}</p>
                    <a className="bg-info btn-info">
                        <i className="fas fa-info fa-xs"></i>
                        <blockquote className="quote-info">
                            <h5>Tip!</h5>
                            {QUERY_TIPS}
                        </blockquote>
                    </a>
                </div>}
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
                    {queries && <div className='input-group-append'>
                        <Link id="btn-filter-saved" className="btn btn-info" data-toggle="dropdown">
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
                                    <div onClick={(e) => {e.preventDefault();this.setQuery(query)}}
                                        className="dropdown-item dropdown-footer"
                                    >
                                        <Link>{query.name}</Link>
                                        <Link className={'float-right ml-2 btn-filter-remove'} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onDeleteCLicked(query)
                                        }}>
                                            <i className={'fa fa-trash'}></i>
                                        </Link>
                                        <Link className={'float-right'} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.onSaveClicked(query)
                                        }}>
                                            <i className={'fa fa-edit'}></i>
                                        </Link>
                                    </div>
                                    <NavDivider/>
                                </div>
                            })}
                        </div>
                    </div>}
                    {queries && <div className='input-group-append'>
                        <Button
                            id='btn-filter-save'
                            className='btn-success'
                            onClick={(e) => {e.preventDefault();this.onSaveClicked()}}
                        >Save</Button>
                    </div>}
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
    onDeleteCLicked: PropTypes.func,
    queries: PropTypes.array
};
