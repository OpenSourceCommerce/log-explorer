import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "../_table";

export default class DeviceWidget extends React.Component {
    render() {
        const {data} = this.props;

        return (
            <Table>
                <tbody>
                {data.map((item, key) => {
                        const {label, value} = item;
                        return (
                            <tr key={key} className="border-top-0 border-bottom">
                                <td className="border-right">{label}</td>
                                <td>{value}</td>
                            </tr>
                        );
                    }
                )}

                </tbody>
            </Table>
        );
    }
}

DeviceWidget.propTypes = {
    data: PropTypes.array
};
