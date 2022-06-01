import React, { useEffect, useState } from "react";
import {
    Spinner,
    Icon,
    Toast,
} from "../../components";
import { DatabaseActions } from "../../actions";
import "../../../styles/pages/tables.scss";
import { DatabaseTableDetail } from "./table-details";

export const DatabaseTables = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tables, setTableList] = useState([]);
    const [currentTableSelected, setCurrentTableSelected] = useState(null);
    const [toastContent, setToastContent] = useState({});

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
                        <button className="ps-cp-4 py-3 btn btn-link text-start fw-medium">
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
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
