import React, {Component} from 'react';
import {Button, Icon} from '.';
import PropTypes from 'prop-types';

export class CardHeader extends Component {
    render() {
        const {showCollapseButton = true, showRemoveButton = true, title = '', children} = this.props;

        return (
            <div className="card-header">
                <h3 className="card-title">{title}</h3>

                <div className="card-tools">
                    {children}

                    {showCollapseButton && <Button color="tool"
                        data-card-widget="collapse"
                        data-toggle="tooltip" title="Collapse">
                        <Icon className="" name={'minus'}/>
                    </Button>}
                    {showRemoveButton && <Button color="tool"
                        data-card-widget="remove"
                        data-toggle="tooltip" title="Remove">
                        <Icon name={'times'}/>
                    </Button>}
                </div>
            </div>
        );
    }
}

CardHeader.propTypes = {
    showCollapseButton: PropTypes.bool,
    showRemoveButton: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.any
};
