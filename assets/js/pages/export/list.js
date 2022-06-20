import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    Button,
    Colors,
    ContentHeader,
    DataTable,
    Icon,
    Modal,
    Size,
    Spinner,
    Toast,
} from "../../components";
import { ExportActions } from "../../actions";
import { TOAST_STATUS } from "../../utils";

const ConfirmDeleteModal = ({ exportSelected, onHidden, onConfirmDeleteExport }) => (
    <Modal
        id="delete-export"
        title="Confirm Delete"
        children={`Are you sure you want to delete this export?`}
        saveButtonTitle="Delete export"
        showSaveButton={true}
        size={Size.medium}
        closeButtonTitle="Cancel"
        saveButtonColor={Colors.red}
        show={!!exportSelected?.id}
        closeButtonAction={onHidden}
        saveButtonAction={onConfirmDeleteExport}
    />
);

const ExportList = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [exportData, setExportData] = useState();
    const [toastContent, setToastContent] = useState();
    const [exportSelected, setExportSelected] = useState();

    useEffect(() => {
        loadExportData();
    }, []);

    const loadExportData = async () => {
        setIsLoading(true);

        const res = await ExportActions.listExport();

        if (res && !res.error) {
            setExportData([...res.data]);
        }

        setIsLoading(false);
    };

    const onConfirmDeleteExport = async () => {
        setIsLoading(true);
        const res = await ExportActions.deleteExport(exportSelected.id);
        let toastContent = {};
        let newExportList = [...exportData];

        if (res && !res.error) {
            toastContent = {
                color: TOAST_STATUS.success,
                message: "Delete export success",
            };

            newExportList = newExportList.filter((item) => item.id !== exportSelected.id);
        } else {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: res.message,
            };
        }

        setExportSelected();
        setExportData([...newExportList]);
        setIsLoading(false);
        setToastContent(toastContent);
    };

    const columns = [
        { label: "Table", dataField: "table" },
        {
            label: "Format",
            dataField: "format",
        },
        {
            label: "Created at",
            dataField: "createdAt",
        },
        {
            label: "Status",
            dataField: "isFinished",
            formatter: ({ cell }) =>
                cell ? (
                    <div className="text-success">
                        <Icon dataFeather="check-circle" className="me-2 feather-sm" />
                        <span className="align-middle">Ready to download</span>
                    </div>
                ) : (
                    <div>Processing</div>
                ),
        },
        {
            label: "Expires at",
            dataField: "expiredAt",
            formatter: ({ cell }) => cell || "-",
        },
        {
            formatter: ({ row }) => {
                const { isFinished = false } = row;
                return (
                    <div>
                        <a
                            href={row.path}
                            target="_blank"
                            className={`btn btn-primary ${!isFinished ? 'disabled': ''}`}
                            title="Download"
                            download={row.filename}
                        >
                            <Icon dataFeather="download" />
                        </a>
                        <Button
                            className="ms-2"
                            outlineColor={Colors.red}
                            onClick={() => setExportSelected({ ...row })}
                        >
                            <Icon dataFeather="trash-2" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="export-page mt-3 ms-cp-4 me-cp-3">
            <div className="content">
                <ConfirmDeleteModal
                    exportSelected={exportSelected}
                    onHidden={() => setExportSelected()}
                    onConfirmDeleteExport={onConfirmDeleteExport}
                />
                <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
                <ContentHeader pageTitle="Exports" iconName="download" />
                {!isLoading ? (
                    <>
                        {exportData && exportData.length > 0 ? (
                            <DataTable
                                columns={columns}
                                dataTable={exportData}
                                className="bg-white"
                            />
                        ) : (
                            <div className="d-flex justify-content-center">No alert found</div>
                        )}
                    </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
};

ReactDOM.render(<ExportList />, document.querySelector("#root"));
