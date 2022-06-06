import React, { useState, useEffect } from "react";
import { Icon, FormField } from "../../components";

const COLUMN_TYPE_LIST = window.clickhouseTypes;
const REGEX_SPECIAL_CHARACTERS = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
const DUPLICATE_FIELD_ERROR = "Duplicate column name error";
const SPECIAL_CHARACTERS_ERROR = "Column name should not contain special characters";
const BLANK_SPACE_ERROR = "Column name not contain blank space";

const TableDetailRow = ({
    columns,
    column,
    position,
    onFieldChange,
    onFieldBlur,
    errorMessage,
    disabled,
    onRemoveColumnClicked,
}) => {
    const { name, type, isDisableEdit } = column;

    const isDisableField = isDisableEdit || disabled;

    const onInputBlur = ({ name, value }) => {
        let error = null;
        if (value) {
            const valueIsExist = !!columns.find(
                (item, index) => index !== position && item.name === value
            )?.name;

            let errorMessage = "";

            if (valueIsExist) {
                errorMessage = DUPLICATE_FIELD_ERROR;
            }

            if (value.indexOf(" ") >= 0) {
                errorMessage = errorMessage
                    ? `${errorMessage} and ${BLANK_SPACE_ERROR}`
                    : BLANK_SPACE_ERROR;
            }

            if (REGEX_SPECIAL_CHARACTERS.test(value)) {
                errorMessage = errorMessage
                    ? `${errorMessage} and ${SPECIAL_CHARACTERS_ERROR}`
                    : SPECIAL_CHARACTERS_ERROR;
            }

            if (errorMessage) {
                error = {
                    position,
                    errorMessage,
                };
            }
        }

        onFieldBlur(position, error);
    };

    return (
        <tr>
            <td className="ps-0" style={{ width: "70%" }}>
                <FormField
                    fieldName="name"
                    value={name}
                    isHiddenLabel={true}
                    disabled={isDisableField}
                    errorMessage={errorMessage}
                    onChange={(e) => onFieldChange(position, e.target)}
                    onBlur={(e) => onInputBlur(e.target)}
                />
            </td>
            <td style={{ width: "25%" }}>
                <FormField
                    fieldName="type"
                    disabled={isDisableField}
                    value={type}
                    type="select"
                    isHiddenLabel={true}
                    onChange={(e) => onFieldChange(position, e.target)}
                >
                    <option value="">Select type</option>
                    {COLUMN_TYPE_LIST.map((item, key) => (
                        <option key={key} value={item}>
                            {item}
                        </option>
                    ))}
                </FormField>
            </td>
            <td className="pe-0" style={{ width: "5%" }}>
                {!isDisableField && (
                    <button
                        className="btn btn-outline-danger"
                        disabled={columns.length < 2}
                        onClick={() => onRemoveColumnClicked(column.name)}
                    >
                        <Icon dataFeather="trash-2" />
                    </button>
                )}
            </td>
        </tr>
    );
};

export const TableColumn = ({
    columns: passedColumns,
    setColumnNameWillRemove,
    isEnableSaveChangesModal,
    onFieldChange,
    onFieldBlur,
    addNewColumn,
    errors,
}) => {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        setColumns(passedColumns);
    }, [passedColumns]);
    return (
        <>
            <div className="table-header d-flex justify-content-between mt-3">
                <span className="fw-bold">Columns</span>
                <button className="btn btn-link text-primary" onClick={() => addNewColumn()}>
                    <Icon dataFeather="plus" className="me-2 feather-sm" />
                    <span className="d-inline-block align-middle fw-medium">Add Column</span>
                </button>
            </div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th className="fw-medium p-0">Name</th>
                        <th className="fw-medium p-0">Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {columns && columns.length > 0
                        ? columns.map((item, key) => {
                              const errorObj = errors.find((item) => item.position === key);
                              return (
                                  <TableDetailRow
                                      columns={columns}
                                      errorMessage={errorObj?.errorMessage}
                                      column={item}
                                      key={key}
                                      position={key}
                                      disabled={isEnableSaveChangesModal}
                                      onFieldChange={onFieldChange}
                                      onFieldBlur={onFieldBlur}
                                      onRemoveColumnClicked={(columnName) =>
                                          setColumnNameWillRemove(columnName)
                                      }
                                  />
                              );
                          })
                        : null}
                </tbody>
            </table>
        </>
    );
};
