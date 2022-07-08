import React from "react";
import PropTypes from "prop-types";
import { Icon } from ".";
import "../../styles/component/_log-views-list.scss";

export const LogViewList = ({ className, onSelected, data, selected, ...rest }) => {
    return (
        <div className={`log-view-list d-flex align-items-center ${className || ""}`} {...rest}>
            <a
                className="text-decoration-none title align-items-center d-inline-flex"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <h4 className="me-2 mb-1 fw-bold"> {selected?.name || ""} </h4>
                <span className="btn-caret">
                    <Icon name="angle-down" />
                </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-left p-0" aria-labelledby="navbarDropdown">
                {isUser() || (
                    <li>
                        <a
                            className="dropdown-item text-primary my-2"
                            href="#"
                            onClick={() => {
                                window.location.href = "/setting?tab=databases";
                            }}
                        >
                            <Icon dataFeather="plus" className="feather-sm stroke-width-4" />
                            <span className="ms-2 align-middle fw-bold">Create new datatable</span>
                        </a>
                    </li>
                )}
                {data &&
                    data.map((item, index) => {
                        const isCurrentDataTable = item?.uuid === selected?.uuid;
                        return (
                            <li key={index}>
                                <a
                                    value={item.uuid}
                                    className={`${
                                        isCurrentDataTable ? "active" : ""
                                    } dropdown-item my-2`}
                                    href="#"
                                    onClick={() => onSelected(item)}
                                >
                                    <span className="d-inline-block align-middle">{item.name}</span>
                                    {isCurrentDataTable ? (
                                        <Icon
                                            dataFeather="check"
                                            className="feather-xs ms-2 stroke-width-4"
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </a>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

LogViewList.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    onSelected: PropTypes.func,
    selected: PropTypes.object,
};
