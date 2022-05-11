import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'feather-icons';

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

    componentDidMount() {
        if (this.props.dataFeather) {
            feather.replace();
        }
    }

    render() {
        const {name = '', className = '', type = 'solid', dataFeather,...rest} = this.props;
        const typeCode = this.getTypeCode(type);
        let classes = `fa${typeCode} fa-${name} ${className}`;

        if(dataFeather) {
            classes = className;
        }

        return (
            <i className={classes}
                { ...( dataFeather && { 'data-feather': dataFeather } ) }
                {...rest}
            />
        );
    }
}

Icon.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    dataFeather: PropTypes.string
};
