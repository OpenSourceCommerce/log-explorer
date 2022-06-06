import React, { useEffect, useState } from "react";
import { Spinner, Icon, Toast, Size, Modal, FormField, Button } from "../../components";
import { DatabaseActions } from "../../actions";
import "../../../styles/pages/tables.scss";
import { DatabaseTableDetail } from "./table-details";
import { TableColumn } from "./table-columns";
import { TOAST_STATUS } from "../../utils";

const DEFAULT_DATATABLE_VALUE = {
    tableName: "",
    ttl: "",
};

const DEFAULT_COLUMNS_DATA = [{ name: "", type: "String" }];

const CreateDatabaseTableModal = ({
    isShow,
    onHidden,
    onCreateDataTableSuccess,
    setToastMessage,
}) => {
    const [errors, setErrors] = useState([]);
    const [dataTable, setDataTable] = useState({ ...DEFAULT_DATATABLE_VALUE });
    const [dataTableColumns, setDataTableColumns] = useState([...DEFAULT_COLUMNS_DATA]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorRes, setErrorRes] = useState("");

    useEffect(() => {
        setErrorRes("");
        setDataTable({ ...DEFAULT_DATATABLE_VALUE });
        setDataTableColumns([...DEFAULT_COLUMNS_DATA]);
        setErrors([]);
        setIsLoading(false);
    }, [isShow]);

    const onFieldChange = ({ name, value }, position) => {
        if (name === "type" || name === "name") {
            let newColumns = dataTableColumns.map((item, index) => {
                const temp = { ...item };
                if (index === position) {
                    temp[name] = value;
                }
                return temp;
            });
            setDataTableColumns([...newColumns]);
        } else {
            setDataTable({ ...dataTable, [name]: value });
        }
        setErrorRes("");
    };

    const addNewColumn = () => {
        setDataTableColumns([...dataTableColumns, { name: "", type: "String" }]);
    };

    const onFieldBlur = (position, error) => {
        let newErrors = [...errors].filter((item) => item.position !== position);

        if (error) newErrors.push(error);

        setErrors(newErrors);
    };

    const setColumnNameWillRemove = () => {};

    const createNewDataTable = async () => {
        setIsLoading(true);
        let toastContent = {};
        const { tableName, ttl } = dataTable;

        const payload = {
            name: tableName,
            ttl,
            columns: dataTableColumns.reduce((arr, item) => {
                if (item.name) {
                    arr.push({
                        ...item,
                        origin: "",
                    });
                }
                return arr;
            }, []),
        };
        const res = await DatabaseActions.createOrUpdate(null, payload);
        if (!res.error) {
            toastContent = { color: TOAST_STATUS.success, message: "Create datatable successful." };
            onCreateDataTableSuccess(tableName);
            onHidden();
            setToastMessage(toastContent);
        } else {
            setErrorRes(res.message);
        }
        setIsLoading(false);
    };

    const { tableName, ttl } = dataTable;

    return (
        <Modal
            size={Size.large}
            id="create-new-table"
            title="Create a new datatable"
            showCloseButton={false}
            isPositionCenter={true}
            show={isShow}
            onHidden={onHidden}
        >
            <div className="mx-3">
                {errorRes && (
                    <div className="alert alert-danger" role="alert">
                        {errorRes}
                    </div>
                )}
                <div className="row mb-3">
                    <FormField
                        className="col-12 col-md-6"
                        label="Table name"
                        fieldName="tableName"
                        value={tableName}
                        isMandatory={true}
                        disabled={isLoading}
                        placeholder="table name"
                        onChange={(e) => onFieldChange(e.target)}
                    />
                </div>
                <div className="row">
                    <FormField
                        className="col-12 col-md-6"
                        label="Table TTL"
                        fieldName="ttl"
                        value={ttl}
                        disabled={isLoading}
                        placeholder="timestamp + toIntervalMonth(100)"
                        onChange={(e) => onFieldChange(e.target)}
                    />
                </div>
                <TableColumn
                    columns={dataTableColumns}
                    errors={errors}
                    setColumnNameWillRemove={setColumnNameWillRemove}
                    isEnableSaveChangesModal={isLoading}
                    onFieldChange={(position, target) => onFieldChange(target, position)}
                    onFieldBlur={onFieldBlur}
                    addNewColumn={addNewColumn}
                />
                <Button
                    className="w-100"
                    disabled={errors.length > 0 || errorRes}
                    isLoading={isLoading}
                    onClick={() => createNewDataTable()}
                >
                    Create Datatable
                </Button>
            </div>
        </Modal>
    );
};

export const DatabaseTables = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tables, setTableList] = useState([]);
    const [currentTableSelected, setCurrentTableSelected] = useState(null);
    const [toastContent, setToastContent] = useState({});
    const [isShowCreateDatabaseTable, setIsShowCreateDatabaseTable] = useState(false);

    const loadDataTableList = async () => {
        const res = await DatabaseActions.getAllTable();
        const { error, data } = res;
        if (!error) {
            setTableList(data);
            if (data.length > 0) setCurrentTableSelected(data[0]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        loadDataTableList();
    }, []);

    const setNewTableName = (originTableName, newTableName) => {
        const newTableList = [...tables];
        const index = newTableList.findIndex((item) => item === originTableName);
        newTableList[index] = newTableName;
        setCurrentTableSelected(newTableName);
        setTableList([...newTableList]);
    };

    const setToastMessage = (toastContent) => {
        setToastContent(toastContent);
    };

    const onDeleteTable = (tableName) => {
        const newTableList = [...tables];
        const findIndex = newTableList.findIndex((item) => item === tableName);
        newTableList.splice(findIndex, 1);
        setCurrentTableSelected(newTableList[0]);
        setTableList([...newTableList]);
    };

    const syncAllTable = async () => {
        setIsLoading(true);
        const res = await DatabaseActions.syncAll();
        if (!res.error) loadDataTableList();
    };

    const onCreateDataTableSuccess = (tableName) => {
        const newDataTableList = [...tables];
        newDataTableList.push(tableName);
        setTableList([...newDataTableList]);
    };

    return (
        <div className="database-page row m-0">
            {!isLoading ? (
                <>
                    <Toast
                        toastContent={toastContent}
                        onToastClosed={() => {
                            setToastContent({});
                        }}
                    />
                    <div className="col-12 col-md-3 bg-white min-h-100 d-flex flex-column p-0 project-list-side">
                        <small className="title ps-cp-4 my-3">Datatables</small>
                        <button
                            className="ps-cp-4 py-3 btn btn-link text-start text-info fw-medium"
                            onClick={() => syncAllTable()}
                        >
                            <Icon dataFeather="refresh-ccw" className="feather-sm me-2" />
                            <span className="d-inline-block align-middle">Sync tables</span>
                        </button>
                        <button
                            className="ps-cp-4 py-3 btn btn-link text-start fw-medium"
                            onClick={() => setIsShowCreateDatabaseTable(true)}
                        >
                            <Icon dataFeather="plus" className="feather-sm me-2" />
                            <span className="d-inline-block align-middle">
                                Create new datatable
                            </span>
                        </button>
                        <ul className="project-list list-unstyled">
                            {tables && tables.length > 0
                                ? tables.map((item, key) => (
                                      <li
                                          key={key}
                                          className={`${
                                              currentTableSelected === item ? "active" : ""
                                          }`}
                                          role="button"
                                      >
                                          <button
                                              className="w-100 d-flex justify-content-between btn btn-link text-start py-3 ps-cp-4 pe-3 text-dark"
                                              onClick={() => setCurrentTableSelected(item)}
                                          >
                                              <span className="d-inline-block align-middle fw-medium">
                                                  {item}
                                              </span>
                                              <Icon dataFeather="chevron-right" />
                                          </button>
                                      </li>
                                  ))
                                : null}
                        </ul>
                    </div>
                    <div className="col-12 col-md-9">
                        {currentTableSelected && (
                            <DatabaseTableDetail
                                setNewTableName={setNewTableName}
                                tableName={currentTableSelected}
                                setToastMessage={setToastMessage}
                                onDeleteTable={onDeleteTable}
                            />
                        )}
                    </div>
                    <CreateDatabaseTableModal
                        isShow={isShowCreateDatabaseTable}
                        onHidden={() => setIsShowCreateDatabaseTable(false)}
                        setToastMessage={setToastMessage}
                        onCreateDataTableSuccess={onCreateDataTableSuccess}
                    />
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
