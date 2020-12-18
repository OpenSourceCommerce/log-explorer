import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class LogViewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {selected} = this.props;
        const preSelected = prevProps.selected;
        if (selected !== preSelected) {
            this.setState({
                selectedItem: selected
            });
        }
    }

    handleChange(event) {
        const {onSelected, data} = this.props;
        const selectedUuid = event.target.value;
        const filteredData = data.filter(item => item.uuid === selectedUuid);
        const selectedItem = filteredData.shift();

        this.setState({selectedItem});

        if (onSelected && typeof onSelected === 'function') {
            onSelected(selectedItem);
        }
    }

    render() {
        let {className, onSelected, data, ...rest} = this.props;
        const {selectedItem} = this.state;
        const value = (selectedItem && selectedItem.uuid) ? selectedItem.uuid : '';
        className += ' form-control';

        return (
            <select onChange={this.handleChange}
                value={value}
                className={className} {...rest}>
                {data && data.map((item, index) => {
                    return (
                        <option key={index} value={item.uuid}>{item.name}</option>
                    );
                })}
            </select>
        );
    }
}

LogViewList.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    onSelected: PropTypes.func,
    selected: PropTypes.object
};
