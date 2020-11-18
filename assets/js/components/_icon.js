import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Icon extends Component {
    getTypeCode(type) {
        switch (type) {
            case 'solid':
                return 's';
            case 'regular':
                return 'r';
            case 'brand':
                return 'b';
            default:
                return 's';
        }
    }

    render() {
        const {name = '', className = '', type = 'solid', ...rest} = this.props;
        const typeCode = this.getTypeCode(type);
        const classes = `fa${typeCode} fa-${name} ${className}`;

        return (
            <i className={classes} {...rest}/>
        );
    }
}

Icon.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string
};
