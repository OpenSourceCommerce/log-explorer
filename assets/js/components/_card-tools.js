import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Colors} from '.';

export class CardTool extends Component {
    render() {
        const {children} = this.props;

        return (
            <div className="btn-group">
                <Button type="button" className="btn btn-sm dropdown-toggle" color={Colors.light}
                    data-toggle="dropdown" data-offset="-52">
                    <Icon name={'bars'}/>
                </Button>
                <div className="dropdown-menu" role="menu">
                    {children}
                </div>
            </div>
        );
    }
}

CardTool.propTypes = {
    children: PropTypes.any
};
