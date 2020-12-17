import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'admin-lte/plugins/select2/js/select2';
import 'admin-lte/plugins/select2/css/select2.css';

export class Select2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }

    componentDidMount() {
        let {id = ''} = this.props;
        if (id === '') {
            id = 's2_' + Math.random().toString(36).slice(2, 11);
        }

        this.setState({id});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {id} = this.state;
        const preId = prevState.id;
        if (id !== preId) {
            $('#' + id).select2();
            const {onChange} = this.props;
            if (onChange) {
                $('#' + id).on('change.select2', e => {
                    onChange(e);
                });
            }
        }
    }

    render() {
        let {id = '', className = '', children, ...rest} = this.props;
        className += ' form-control';

        return (
            <select id={id} className={className} onChange={e => {}} {...rest}>
                {children}
            </select>
        );
    }
}

Select2.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    id: PropTypes.string,
    children: PropTypes.any
};
