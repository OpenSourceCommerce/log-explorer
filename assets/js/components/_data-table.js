import React, { Component } from "react";
import PropTypes from "prop-types";

export class DataTable extends Component {
    render() {
        let { columns, className = "", dataTable } = this.props;

        return (
            <table className={`table table-striped table-responsive table-sortable ${className}`}>
                <thead>
                    <tr className="border-0">
                        {columns.map((item, index) => {
                            const { className, headerClassName, isSortable = true, label } = item;
                            const classStr = `text-capitalize${className || ""}${
                                headerClassName || ""
                            } ${isSortable ? "col-sortable" : ""}`;
                            return (
                                <th className={classStr.trim()} scope="col" key={index}>
                                    {label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((item, index) => (
                        <tr key={index}>
                            {columns.map((headerItem, position) => {
                                const {
                                    dataField,
                                    formatter: Format,
                                    className,
                                    label,
                                } = headerItem;
                                const cell = item[dataField];
                                return (
                                    <td
                                        className={`${className || ""}`}
                                        key={position}
                                        data-label={label}
                                    >
                                        {Format ? (
                                            <Format row={item} cell={cell} index={index} />
                                        ) : (
                                            cell
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

DataTable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
};
