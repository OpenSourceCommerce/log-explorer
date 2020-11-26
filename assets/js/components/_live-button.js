import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Live} from '../actions';

export class LiveButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            live: true,
            interval: 2000
        };
        this.changeLive = this.changeLive.bind(this);
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

    componentDidMount() {
        const {live = true, interval = 2000} = this.props;
        this.setState({
            live: live,
            interval: interval
        });
        Live.start(interval);
    }

    render() {
        const {...rest} = this.props;
        const {live} = this.state;

        return (
            <div {...rest}>
                Real time
                <button className="btn btn-app" onClick={this.changeLive}><i className={live ? 'fa fa-pause' : 'fa fa-play'}></i>{live ? 'Pause' : 'Play'}</button>
            </div>
        );
    }
}

LiveButton.propTypes = {
    live: PropTypes.bool,
    interval: PropTypes.number,
    className: PropTypes.string
};
