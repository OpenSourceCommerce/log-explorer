import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Colors, Icon, Input, Link, NavDivider } from ".";
import { Live, Event } from "../actions";
import { Button } from "./_button";
import "../../styles/component/_filter-text.scss";

const QUERY_TIPS = (
    <ul>
        <li>
            Search like <code>DateTime:</code>
            <code className="text-muted"> toString(timestamp) like '2022-04-27 03:19%'</code>.
        </li>
    </ul>
);

export const FilterText = ({
    value: passedQuery,
    placeholder,
    label,
    queries,
    onDeleteCLicked,
    onSaveClicked,
    onBlur,
    className: passedClassName,
    onQuerySelected,
    isVisibleEditQuery = true,
    clearQueryButton,
    isError,
    queryObj,
}) => {
    const [isInvalid, setIsInValid] = useState(false);
    const [queryStr, setQueryStr] = useState("");

    useEffect(() => {
        setQueryStr(passedQuery);
    }, [passedQuery]);

    useEffect(() => {
        if (isError) {
            setIsInValid(true);
        }
    }, [isError]);

    useEffect(() => {
        let isInvalidData = isInvalid;
        Event.bus.register(Event.RESPONSE_ERROR, (response) => {
            const { error, filter } = response;
            if (error === Event.ERROR_INVALID_QUERY) {
                if (queryStr === filter) {
                    isInvalidData = true;
                }
            }
        });
        setIsInValid(isInvalidData);
    }, []);

    const handleChange = (e) => {
        setQueryStr(e && e.target ? e.target.value : "");
        setIsInValid(false);
    };

    const onKeyUp = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            Live.refresh();
        }
    };

    const setQuery = async (query) => {
        await setQueryStr(query.query);
        if (onQuerySelected) onQuerySelected(query.query);
        Live.refresh();
    };

    let className = `${passedClassName} input-search`;
    if (isInvalid) {
        className += " is-invalid";
    }

    return (
        <>
            {label && (
                <div className="title-info align-items-center">
                    <p className="float-start mb-1">{label}</p>
                    <a className="bg-info btn-info rounded-circle d-inline-block text-center align-bottom ms-2">
                        <i className="fas fa-info"></i>
                        <div className="bd-callout bd-callout-info quote-info shadow">
                            <h5>Tip!</h5>
                            {QUERY_TIPS}
                        </div>
                    </a>
                </div>
            )}
            <div className="input-group">
                <Input
                    className={`form-group ${className}`}
                    id="filter-text"
                    type="search"
                    name="query"
                    value={queryStr}
                    placeholder={placeholder}
                    aria-label="Search"
                    onKeyUp={onKeyUp}
                    onChange={handleChange}
                    onBlur={(e) => {
                        if (onBlur) onBlur(e);
                    }}
                />
                {queries && (
                    <div className="input-group-append">
                        <Link
                            id="btn-filter-saved"
                            className="btn btn-secondary"
                            data-bs-toggle="dropdown"
                        >
                            <Icon name="chevron-down" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            {queries.length === 0 && (
                                <>
                                    <Link className="dropdown-item dropdown-footer">
                                        No item saved
                                    </Link>
                                </>
                            )}
                            {queries.map((query, key) => {
                                return (
                                    <div key={key}>
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setQuery(query);
                                            }}
                                            className="dropdown-item dropdown-footer"
                                        >
                                            <Link>{query.name}</Link>
                                            <Link
                                                className={"float-end ms-2 btn-filter-remove"}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onDeleteCLicked(query);
                                                }}
                                            >
                                                <i className={"fa fa-trash"}></i>
                                            </Link>
                                            {isVisibleEditQuery && (
                                                <Link
                                                    className={"float-end"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        this.onSaveClicked(query);
                                                    }}
                                                >
                                                    <i className={"fa fa-edit"}></i>
                                                </Link>
                                            )}
                                        </div>
                                        <NavDivider />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {queries && (
                    <div className="input-group-append">
                        <Button
                            className="btn-bg-white"
                            id="btn-filter-save"
                            outlineColor={Colors.blue}
                            onClick={(e) => {
                                e.preventDefault();
                                onSaveClicked();
                            }}
                        >
                            {queryObj?.id ? "Update" : "Save"}
                        </Button>
                    </div>
                )}
                {clearQueryButton}
            </div>
        </>
    );
};

FilterText.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSaveClicked: PropTypes.func,
    onDeleteCLicked: PropTypes.func,
    queries: PropTypes.array,
};
