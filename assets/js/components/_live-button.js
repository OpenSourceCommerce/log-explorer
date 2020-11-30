import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ToggleButton} from './_toggle-button';
export class LiveButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isLive, handleRealTimeClicked, disableLive} = this.props;

        console.log('disableLive', disableLive);

        return (
            <div className="card-tools action-panel">
                <div className="d-inline-flex justify-content-between">
                    Real time
                    <ToggleButton
                        className="ml-3"
                        onChange={handleRealTimeClicked}
                        checked={isLive}
                        disabled={disableLive}
                    />
                </div>
            </div>

        );
    }
}

LiveButton.propTypes = {
    isLive: PropTypes.bool,
    disableLive: PropTypes.bool,
    handleRealTimeClicked: PropTypes.func,
};
