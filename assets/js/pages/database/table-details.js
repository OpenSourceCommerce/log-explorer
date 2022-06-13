import React, { useState, useEffect } from "react";
import { Button, FormField, Icon, Spinner } from "../../components/";
import isEqual from "lodash/isEqual";
import DatabaseActions from "../../actions/_database-actions";
import { Modal, Colors } from "../../components";
import { Size } from "../../components/_size";
import { TOAST_STATUS } from "../../utils";
import { TableColumn } from "./table-columns";
import { Color } from "react-input-color";

const DEFAULT_COLUMN_DATA = {
    name: "",
    type: "String",
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

        let newErrors = [...errors].filter((item) => item.position !== index);
        setError([...newErrors]);
    };

    const onFieldBlur = (position, error) => {
        let newErrors = [...errors].filter((item) => item.position !== position);

        if (error) newErrors.push(error);

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
            const newColumns = columns.map((item) => ({
                ...item,
                originType: item.type,
                originName: item.name,
            }));
            setColumns([...newColumns]);
            setOriginColumnData([...newColumns]);
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

    const onRemoveColumnClick = (column) => {
        if (column.originName) {
            setColumnNameWillRemove(column.name);
            return;
        }
        const newColumns = [...columns];
        newColumns.splice(column.position, 1);
        setColumns([...newColumns]);
    };

    const addNewColumn = () => {
        setColumns([...columns, { ...DEFAULT_COLUMN_DATA }]);
    };

    const isEnableSaveChanges =
        !isEqual(passedTableName, tableName) || !isEqual(originColumnData, columns);

    return (
        <>
            {!isLoading ? (
                <>
                    <div className="table-detail mt-3 me-cp-3 ms-2">
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
                                <Button
                                    outlineColor={Colors.red}
                                    className="me-2"
                                    onClick={() => setTableWillRemove(tableName)}
                                >
                                    <Icon dataFeather="trash-2" className="feather-xs me-2" />
                                    <span className="d-inline-block align-middle">
                                        Delete datatable
                                    </span>
                                </Button>
                                <Button
                                    onClick={() => setIsEnableSaveChangesModal(true)}
                                    disabled={!isEnableSaveChanges || errors.length > 0}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                        <TableColumn
                            columns={columns}
                            errors={errors}
                            setColumnNameWillRemove={(column) => onRemoveColumnClick(column)}
                            isEnableSaveChangesModal={isEnableSaveChangesModal}
                            onFieldChange={onFieldChange}
                            onFieldBlur={onFieldBlur}
                            addNewColumn={addNewColumn}
                        />
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
