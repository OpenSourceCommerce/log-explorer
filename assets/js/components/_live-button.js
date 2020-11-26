import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Live} from '../actions';
import {FilterDate} from '.';

export class LiveButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            live: true,
            disableLive: false,
            interval: 2000
        };
        this.changeLive = this.changeLive.bind(this);
        this.onDateRangeChanged = this.onDateRangeChanged.bind(this);
    }

    changeLive() {
        const {live, interval} = this.state;
        this.setState({
            live: !live
        });
        if (live) {
            Live.pause();
        } else {
            Live.start(interval, true);
        }
    }

    onDateRangeChanged(from, to) {
        const {live, interval} = this.state;
        if (live && to !== null) {
            this.setState({
                live: false,
                disableLive: true
            });
            Live.pause();
        } else if (!live && to === null) {
            this.setState({
                live: true,
                disableLive: false
            });
            Live.start(interval);
        }

        Live.refresh();
    }

    componentDidMount() {
        const {live = true, interval = 2000} = this.props;
        this.setState({
            live,
            interval
        });
        Live.start(interval);
    }

    render() {
        const {...rest} = this.props;
        const {live, disableLive} = this.state;

        return (
            <div {...rest}>
                <FilterDate
                    className="d-inline"
                    onDateRangeChanged={this.onDateRangeChanged}
                />
                Real time
                <button disabled={disableLive} className="btn btn-app" onClick={this.changeLive}><i className={live ? 'fa fa-pause' : 'fa fa-play'}></i>{live ? 'Pause' : 'Play'}</button>
            </div>
        );
    }
}

LiveButton.propTypes = {
    live: PropTypes.bool,
    interval: PropTypes.number,
    className: PropTypes.string
};
