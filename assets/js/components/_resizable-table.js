import React, { useEffect, useRef, useState } from "react";
import ColumnResizer from "column-resizer";
import { Live, LogTableActions } from "../actions";
import { Button, Icon, Input, LogDetailSidebar, Spinner } from ".";
import "../../styles/component/_resizable-table.scss";

const DATA_TYPE = "json";
const PAGE_SIZE = 100;

const ResizableTableComponent = ({ resizable = true, headerChildren, bodyChildren }) => {
    const tableRef = useRef(null);
    const resizerOptions = {
        onResize: (e) => {
            // on Resize table will be call after drop
        },
        partialRefresh: true,
        // widths: [48.9688, 94.0156, 94.5156, 1316.5],
    };

    const [resize, setResize] = useState();

    const enableResize = () => {
        if (!resize) {
            const resizeFn = new ColumnResizer(tableRef.current, resizerOptions);

            tableRef.current.className = tableRef.current?.className?.replace("grip-padding", "");

            setResize(resizeFn);
        } else {
            resize?.reset(resizerOptions);
        }
    };

    const disableResize = () => {
        if (!!resize) {
            resize?.reset({ disable: true });
        }
    };

    useEffect(() => {
        if (tableRef.current && resizable) {
            enableResize();
        }
    }, [tableRef]);

    useEffect(() => {
        //return disableResize();
    }, []);

    return (
        <table
            className="table table-bordered table-striped table-hover resizable-table"
            ref={tableRef}
            id="resizable-table"
        >
            <thead>
                <tr>{headerChildren}</tr>
            </thead>
            {bodyChildren}
        </table>
    );
};

const generateTableBody = (dataTable, columns, onRowClick) => (
    <tbody>
        {dataTable.length > 0 ? (
            dataTable.map((item, index) => (
                <tr
                    key={index}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    role="button"
                    onClick={() => onRowClick(item)}
                >
                    {columns.map((column, position) => {
                        const dataField = column?.name;
                        return (
                            <td key={position} data-label={dataField}>
                                {item[dataField]}
                            </td>
                        );
                    })}
                </tr>
            ))
        ) : (
            <tr></tr>
        )}
    </tbody>
);

const generateTableHeader = (columns) => (
    <>
        {columns.map((label, index) => (
            <th scope="col" key={index}>
                {label?.name}
            </th>
        ))}
    </>
);

const Pagination = ({ totalItem, gotoPages, pageIndex }) => {
    let maxPageNumber = 0;

    if (totalItem && totalItem > 0) {
        maxPageNumber = Math.floor(totalItem / PAGE_SIZE);
        if (totalItem % PAGE_SIZE > 0) {
            maxPageNumber++;
        }
    }

    return (
        <>
            {maxPageNumber && maxPageNumber > 1 && (
                <div className="mt-2 pagination-custom">
                    <div className="d-flex align-items-center justify-content-center">
                        <Button
                            className="border-0 p-button me-2"
                            disabled={pageIndex === 1}
                            onClick={() => gotoPages(1)}
                        >
                            <Icon name="step-backward p-icon"></Icon>
                        </Button>
                        <Button
                            className="border-0 p-button me-2"
                            disabled={pageIndex === 1}
                            onClick={() => gotoPages(pageIndex - 1)}
                        >
                            <Icon name="chevron-left p-icon"></Icon>
                        </Button>
                        <Input
                            className="p-2 input-page-number h-75 text-right ps-2"
                            type="number"
                            min="1"
                            max={maxPageNumber}
                            value={pageIndex + ""}
                            onChange={(e) => {
                                let newIndex = parseInt(e.target?.value);
                                if (newIndex > maxPageNumber) {
                                    newIndex = maxPageNumber;
                                }
                                gotoPages(newIndex);
                            }}
                        ></Input>
                        <p className="total-page m-0 p-2">/ {maxPageNumber} </p>
                        <Button
                            className="border-0 p-button me-2"
                            disabled={pageIndex === maxPageNumber}
                            onClick={() => gotoPages(pageIndex + 1)}
                        >
                            <Icon name="chevron-right p-icon"></Icon>
                        </Button>
                        <Button
                            className="border-0 p-button"
                            disabled={pageIndex === maxPageNumber}
                            onClick={() => gotoPages(maxPageNumber)}
                        >
                            <Icon name="step-forward p-icon"></Icon>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export const ResizableTable = ({ columnList, onDataLoaded, ...props }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalItem, setTotalItem] = useState();
    const [rowDetailClicked, setRowDetailClicked] = useState();

    useEffect(() => {
        setColumns(columnList.filter((item) => !!item.visible));
        loadData();
    }, [columnList]);

    const loadData = async (pageIndex = 1) => {
        setIsLoading(true);
        const dataSrc = "/api/stream/" + LogTableActions.getUuid(uuid) + "/list";
        let filter = LogTableActions.getOptions({
            pageIndex,
            pageSize: PAGE_SIZE,
        });

        const res = await $.ajax({
            url: dataSrc,
            data: filter,
            dataType: DATA_TYPE,
        });

        if (res && !res.error) {
            setData(res.data);
            setTotalItem(res.itemsCount);
            onDataLoaded(res);
        }
        setIsLoading(false);
    };

    const gotoPages = async (pageIndex) => {
        await loadData(pageIndex);
        setPageIndex(pageIndex);
    };

    useEffect(() => {
        Live.onRefresh(() => {
            loadData();
        });
    }, []);

    return (
        <div className={`position-relative ${isLoading ? "loading" : ""}`}>
            {data && data.length > 0 ? (
                <>
                    <ResizableTableComponent
                        key={columns}
                        isLoading={isLoading}
                        data={data}
                        columns={columns}
                        bodyChildren={generateTableBody(data, columns, (rowItem) => {
                            setRowDetailClicked(rowItem);
                        })}
                        headerChildren={generateTableHeader(columns)}
                    />
                    <Pagination
                        pageIndex={pageIndex}
                        totalItem={totalItem}
                        gotoPages={(pageIndex) => gotoPages(pageIndex)}
                    />
                    <LogDetailSidebar item={rowDetailClicked} />
                </>
            ) : (
                <div className="text-center">No data found </div>
            )}

            {isLoading && (
                <div className="position-absolute loading-spinner d-flex flex-column justify-content-center align-items-center">
                    <Spinner isFullHeight={false} />
                    <div className="mt-3">Loading Data</div>
                </div>
            )}
        </div>
    );
};
