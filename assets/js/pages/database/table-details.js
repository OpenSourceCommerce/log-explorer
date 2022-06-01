import React, { useState, useEffect } from "react";
import { Button, FormField, Icon, Spinner } from "../../components/";
import isEqual from "lodash/isEqual";
import DatabaseActions from "../../actions/_database-actions";
import { Modal, Colors } from "../../components";
import { Size } from "../../components/_size";
import { TOAST_STATUS } from "../../utils";

const COLUMN_TYPE_LIST = window.clickhouseTypes;

const DEFAULT_COLUMN_DATA = {
    name: "",
    type: "String",
};

const REGEX_SPECIAL_CHARACTERS = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
const EMPTY_FIELD_ERROR = "Please fill out this field.";
const DUPLICATE_FIELD_ERROR = "Duplicate column name error.";
const SPECIAL_CHARACTERS_ERROR = "Column name should not contain special characters.";

const TableDetailRow = ({
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
                    onBlur={(e) => onFieldBlur(position, e.target.value)}
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
                        onClick={() => onRemoveColumnClicked(column.name)}
                    >
                        <Icon dataFeather="trash-2" />
                    </button>
                )}
            </td>
        </tr>
    );
};

const AlertUpdateColumn = ({
    name,
    isShow,
    columns,
    onHidden,
    onUpdateTableClick,
    passedTableName,
    tableName,
}) => {
    const confirmMessages = columns.reduce((arr, item) => {
        const { originName, name, type, originType } = item;

        if (!originName) {
            arr.push(`Create new column "${name}" with type "${type}"`);
        } else {
            if (originName !== name) {
                arr.push(`Column from "${originName}" to "${name}"`);
            }

            if (originType !== type) {
                arr.push(`Column from "${originType}" to "${type}"`);
            }
        }

        return arr;
    }, []);

    if (tableName !== passedTableName) {
        confirmMessages.unshift(`Table name from "${passedTableName}" to "${tableName}"`);
    }

    return (
        <Modal
            id={`update-column-${name}`}
            size={Size.medium}
            title={`Update table ${name}`}
            show={isShow}
            onHidden={onHidden}
            closeButtonAction={onHidden}
            saveButtonTitle="Save Changes"
            showSaveButton={true}
            saveButtonColor={Colors.blue}
            saveButtonAction={onUpdateTableClick}
        >
            <p>Are you sure to change table structure?</p>
            {confirmMessages.map((item, index) => (
                <span className="d-block text-break" key={index}>
                    {item}
                </span>
            ))}
        </Modal>
    );
};

const AlertRemoveColumn = ({ columnName, isShow, onHidden, onConfirmRemoveColumnClick }) => (
    <Modal
        id={`remove-column-${columnName}`}
        size={Size.medium}
        title={`Delete "${columnName}" column`}
        show={isShow}
        onHidden={onHidden}
        closeButtonAction={onHidden}
        saveButtonTitle="Confirm Delete"
        showSaveButton={true}
        saveButtonColor={Colors.red}
        saveButtonAction={() => onConfirmRemoveColumnClick(columnName)}
    >
        <p className="text-danger">
            Be careful - this will also delete the column in clickhouse table!
        </p>
    </Modal>
);

const AlertDeleteTable = ({ tableName, onConfirmDeleteTable, onHidden }) => {
    return (
        <Modal
            size={Size.medium}
            id={"delete-table"}
            title={`Deleting table ${tableName}`}
            showCloseButton={true}
            closeButtonTitle="Abort"
            showSaveButton={true}
            saveButtonTitle="OK"
            saveButtonColor="danger"
            saveButtonAction={() => onConfirmDeleteTable(tableName)}
            show={!!tableName}
            onHidden={onHidden}
        >
            Be careful - this will also delete the table in clickhouse database!
        </Modal>
    );
};

export const DatabaseTableDetail = ({
    tableName: passedTableName,
    setNewTableName,
    setToastMessage,
    onDeleteTable,
}) => {
    const [tableName, setTableName] = useState(passedTableName);
    const [originColumnData, setOriginColumnData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isEnableSaveChangesModal, setIsEnableSaveChangesModal] = useState(false);
    const [errors, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [columnNameWillRemove, setColumnNameWillRemove] = useState("");
    const [tableWillRemove, setTableWillRemove] = useState("");

    useEffect(() => {
        setTableName(passedTableName);
        setIsLoading(true);

        const loadTableColumns = async () => {
            if (!passedTableName) {
                return;
            }
            const res = await DatabaseActions.getTableColumns(passedTableName);
            const { data, error } = res;
            if (!error) {
                const columnList = data.map((item) => ({
                    ...item,
                    originName: item.name,
                    originType: item.type,
                    isDisableEdit: ["timestamp", "_id"].includes(item.name),
                }));

                setOriginColumnData(columnList);
                setColumns(columnList);
                setIsLoading(false);
            }
        };

        loadTableColumns();

        setError([]);
    }, [passedTableName]);

    const onFieldChange = (index, { name, value }) => {
        setColumns((columnList) => {
            let cloneColumnList = [...columnList];
            let cloneColumnItemChange = { ...cloneColumnList[index] };
            cloneColumnItemChange[name] = value;
            cloneColumnList[index] = { ...cloneColumnItemChange };
            return [...cloneColumnList];
        });

        let newErrors = [...errors].filter((item) => item.index !== index);

        if (!value) {
            newErrors.push({
                index,
                errorMessage: EMPTY_FIELD_ERROR,
            });
        }

        setError([...newErrors]);
    };

    const onFieldBlur = (position, value) => {
        let newErrors = [...errors].filter((item, index) => index !== position);

        if (value) {
            const valueIsExist = !!columns.find(
                (item, index) => index !== position && item.name === value
            )?.name;

            if (valueIsExist) {
                newErrors.push({
                    index: position,
                    errorMessage: DUPLICATE_FIELD_ERROR,
                });
            }

            if (REGEX_SPECIAL_CHARACTERS.test(value)) {
                newErrors.push({
                    index: position,
                    errorMessage: SPECIAL_CHARACTERS_ERROR,
                });
            }
        }
        setError(newErrors);
    };

    const onSubmitUpdateTable = async () => {
        const dataPayload = {
            name: tableName,
            columns: columns.map((item) => {
                const { name, originName, type } = item;
                return {
                    name,
                    origin: originName,
                    type,
                };
            }),
        };
        const res = await DatabaseActions.createOrUpdate(passedTableName, dataPayload);
        await setIsEnableSaveChangesModal(false);
        if (!res.error) {
            setOriginColumnData([...columns]);
            if (passedTableName !== tableName) {
                setNewTableName(passedTableName, tableName);
            }
            setToastMessage({
                color: TOAST_STATUS.success,
                message: "Update table successful.",
            });
        } else {
            setToastMessage({
                color: TOAST_STATUS.failed,
                message: res.message,
                timeoutCloseToast: 4000,
            });
        }
    };

    const onConfirmRemoveColumnClick = async (columnName) => {
        const res = await DatabaseActions.deleteColumn(tableName, columnName);
        const { error } = res;
        if (!error) {
            const newColumns = [...columns];
            const key = newColumns.findIndex((el) => el.name === columnName);
            newColumns.splice(key, 1);
            setColumns([...newColumns]);
            setOriginColumnData([...newColumns]);
            setColumnNameWillRemove("");
            setToastMessage({
                color: TOAST_STATUS.success,
                message: res.message,
            });
        } else {
            setToastMessage({
                color: TOAST_STATUS.failed,
                message: res.message,
            });
        }
    };

    const onConfirmDeleteTable = async (tableName, onDeleteTable) => {
        const res = await DatabaseActions.deleteTable(tableName);
        const { error } = res;
        if (!error) {
            setTableWillRemove("");
            setToastMessage({
                color: TOAST_STATUS.success,
                message: res.message,
            });
            onDeleteTable(tableName);
        } else {
            setToastMessage({
                color: TOAST_STATUS.failed,
                message: res.message,
            });
        }
    };

    const addNewColumn = () => {
        setColumns([{ ...DEFAULT_COLUMN_DATA }, ...columns]);
    };

    const isEnableSaveChanges =
        !isEqual(passedTableName, tableName) || !isEqual(originColumnData, columns);

    return (
        <>
            {!isLoading ? (
                <>
                    <div className="table-detail mt-3 me-cp-3 ms-2 fw-medium">
                        <div className="d-flex justify-content-between align-items-end">
                            {tableName && (
                                <FormField
                                    className="w-25"
                                    label="Table name"
                                    value={tableName}
                                    disabled={isEnableSaveChangesModal}
                                    onChange={(e) => {
                                        setTableName(e.target.value);
                                    }}
                                />
                            )}
                            <div className="action-button">
                                <button
                                    className="me-2 btn btn-outline-danger"
                                    onClick={() => setTableWillRemove(tableName)}
                                >
                                    <Icon dataFeather="trash-2" className="feather-xs me-2" />
                                    <span className="d-inline-block align-middle fw-medium">
                                        Delete datatable
                                    </span>
                                </button>
                                <Button
                                    onClick={() => setIsEnableSaveChangesModal(true)}
                                    className="fw-medium"
                                    disabled={!isEnableSaveChanges || errors.length > 0}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                        <div className="table-header d-flex justify-content-between mt-3">
                            <span className="fw-bold">Columns</span>
                            <button
                                className="btn btn-link text-primary"
                                onClick={() => addNewColumn()}
                            >
                                <Icon dataFeather="plus" className="me-2 feather-sm" />
                                <span className="d-inline-block align-middle fw-medium">
                                    Add Column
                                </span>
                            </button>
                        </div>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th className="fw-medium">Name</th>
                                    <th className="fw-medium">Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {columns && columns.length > 0
                                    ? columns.map((item, key) => {
                                          const errorObj = errors.find(
                                              (item) => item.index === key
                                          );
                                          return (
                                              <TableDetailRow
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
                    </div>
                    <AlertUpdateColumn
                        name={tableName}
                        columns={columns}
                        passedTableName={passedTableName}
                        tableName={tableName}
                        isShow={isEnableSaveChangesModal}
                        onHidden={() => {
                            setIsEnableSaveChangesModal(false);
                        }}
                        onUpdateTableClick={() => {
                            onSubmitUpdateTable();
                        }}
                    />
                    <AlertRemoveColumn
                        columnName={columnNameWillRemove}
                        isShow={!!columnNameWillRemove}
                        onHidden={() => {
                            setColumnNameWillRemove("");
                        }}
                        onConfirmRemoveColumnClick={onConfirmRemoveColumnClick}
                    />
                    <AlertDeleteTable
                        tableName={tableWillRemove}
                        isShow={!!tableWillRemove}
                        onHidden={() => {
                            setTableWillRemove("");
                        }}
                        onConfirmDeleteTable={(tableName) =>
                            onConfirmDeleteTable(tableName, onDeleteTable)
                        }
                    />
                </>
            ) : (
                <Spinner />
            )}
        </>
    );
};
