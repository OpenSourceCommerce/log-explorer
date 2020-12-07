import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from '.';
import {Live, Event} from '../actions';

export class FilterText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalid: false,
            value: ''
        };
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    render() {
        const {placeholder, label, ...rest} = this.props;
        const {isInvalid, value} = this.state;
        let className = 'input-search';
        if (isInvalid) {
            className += ' is-invalid';
        }

        return (
            <div {...rest}>
                <div>
                    <p className="float-left mb-2">{label}</p>
                    {value && <a className="float-right" href="#" onClick={() => {
                        this.handleChange();
                    }}>Clear</a>}
                </div>
                <Input
                    className={className}
                    id="filter-text"
                    value={value}
                    placeholder={placeholder}
                    aria-label="Search"
                    onKeyUp={this.onKeyUp}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

FilterText.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
};
