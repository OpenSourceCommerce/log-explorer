import React from "react";

export const WidgetDataTable = ({ column, data, onItemClicked }) => {
    return (
        <div className="widget-table table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        {column.map((item, key) => {
                            const columnHeader = item === "value" ? "Count" : item;
                            return (
                                <th scope="col" key={key}>
                                    {columnHeader}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => (
                        <tr key={key}>
                            {column.map((el, key) => (
                                <td
                                    key={key}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        if (el !== "value") {
                                            if (onItemClicked) onItemClicked();
                                        }
                                    }}
                                >
                                    {item[el]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};