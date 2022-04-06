import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ToggleButton} from './_toggle-button';
export class LiveButton extends Component {
    render() {
        const {isLive, handleRealTimeClicked, disableLive} = this.props;

        return (
            <div className="card-tools action-panel">
                <div className="d-inline-flex justify-content-between">
                    Real time
                    <ToggleButton
                        className={disableLive ? "ms-3 disable" : "ms-3"}
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
    handleRealTimeClicked: PropTypes.func
};
