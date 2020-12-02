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
            value: e.target.value,
            isInvalid: false
        });
    }

    onKeyUp(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            Live.refresh();
        }
    }

    render() {
        const {placeholder, ...rest} = this.props;
        const {isInvalid, value} = this.state;
        let className = 'input-search';
        if (isInvalid) {
            className += ' is-invalid';
        }

        return (
            <div {...rest}>
                <Input
                    className={className}
                    type="search" id="filter-text"
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
    placeholder: PropTypes.string
};
