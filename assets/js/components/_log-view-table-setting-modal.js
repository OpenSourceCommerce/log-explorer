import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox, Modal, Button, Colors, Size, Input, Spinner, Icon, Link, Text } from ".";
import isEqual from "lodash/isEqual";
import { LogViewActions } from "../actions";
import GridLayout from "react-grid-layout";
import "../../styles/component/_log-view-table-setting-modal.scss";

const HeaderChildren = (
    <Link href="/setting?tab=databases" className="text-decoration-none me-4">
        <Icon dataFeather="settings" className="feather-sm stroke-width-3 me-2" />
        <Text className="fw-bold d-inline-block align-middle">Edit Columns</Text>
    </Link>
);

export const LogViewTableSettingModal = ({ columnData, show, onSave, onHidden, selectedTable }) => {
    const [columnActiveListOrigin, setColumnActiveListOrigin] = useState([]);
    const [columnAvailableListOrigin, setColumnAvailableListOrigin] = useState([]);
    const [columnActiveList, setColumnActiveList] = useState([]);
    const [columnAvailableList, setColumnAvailableList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (columnData) {
            loadColumns();
        }
    }, [columnData]);

    const loadColumns = async () => {
        const activeList = columnData.filter((item) => !!item.visible);
        const availableList = columnData.filter((item) => !item.visible);
        setColumnActiveListOrigin(activeList);
        setColumnActiveList(activeList);
        setColumnAvailableList(availableList);
        setColumnAvailableListOrigin(availableList);
    };

    const onAddColumnClick = (column) => {
        const newActiveList = [...columnActiveList, { ...column }];
        setColumnActiveList([...newActiveList]);
        const newAvailableList = columnAvailableList.filter((item) => item.title !== column.title);
        setColumnAvailableList([...newAvailableList]);
    };

    const onRemoveColumnClick = (column) => {
        const newAvailableList = [...columnAvailableList, { ...column }];
        setColumnAvailableList([...newAvailableList]);
        const newActiveList = columnActiveList.filter((item) => item.title !== column.title);
        setColumnActiveList([...newActiveList]);
    };

    const classNameColumnItem =
        "d-flex align-items-center justify-content-center btn btn-default px-3 py-1 me-2 mb-2";

    const onSaveChanges = async () => {
        setIsLoading(true);

        let columnUpdated = [];

        columnActiveList.forEach((item, position) => {
            let itemPosition = position + 1;
            let columnShouldUpdate = false;
            const itemOrigin = columnActiveListOrigin.find((el) => el.name === item.name);
            if (itemOrigin) {
                if (itemOrigin.index !== itemPosition) {
                    columnShouldUpdate = true;
                }
            } else {
                columnShouldUpdate = true;
            }
            if (columnShouldUpdate) {
                columnUpdated.push(
                    LogViewActions.updateColumnSetting(
                        selectedTable.uuid,
                        item.name,
                        1,
                        itemPosition,
                        ""
                    )
                );
            }
        });

        columnActiveListOrigin.forEach((item) => {
            const itemOrigin = columnActiveList.find((el) => el.name === item.name);
            if (!itemOrigin) {
                columnUpdated.push(
                    LogViewActions.updateColumnSetting(
                        selectedTable.uuid,
                        item.name,
                        0,
                        item.index,
                        ""
                    )
                );
            }
        });

        if (columnUpdated.length > 0) {
            const res = await Promise.all(columnUpdated);
            setColumnActiveListOrigin(columnActiveList);
            sessionStorage.removeItem("resizable-table");
            setIsLoading(false);
            onSave();
        }
    };

    return (
        <Modal
            className="customize-table-modal"
            title="Customize Table"
            id="Customize-table"
            size={Size.extraLarge}
            showCloseButton={false}
            showSaveButton={true}
            headerChildren={HeaderChildren}
            saveButtonTitle="Save Changes"
            show={show}
            saveButtonAction={() => onSaveChanges()}
            onHidden={onHidden}
            disableSaveButton={isEqual(columnActiveList, columnActiveListOrigin)}
        >
            {!isLoading ? (
                <div className="row m-0">
                    <div className="col-12 col-md-8 ps-3">
                        <div className="content my-3">
                            <div className="title">Active Columns</div>
                            <div className="d-flex flex-wrap align-items-center column-panel align-content-center">
                                {columnActiveList.map((item) => (
                                    <button
                                        key={item.name}
                                        className={classNameColumnItem}
                                        onClick={() => onRemoveColumnClick(item)}
                                    >
                                        <span>{item.title}</span>
                                        <Icon
                                            dataFeather="x"
                                            className="feather-xs stroke-width-4 ms-2 remove-icon"
                                        />
                                    </button>
                                ))}
                                {columnAvailableList.length > 0 && (
                                    <div className="empty-active-item mb-2"></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 bg-light pe-3">
                        <div className="content mt-3">
                            <div className="title">Add Columns</div>
                            <div className="d-flex flex-wrap align-items-center column-panel align-content-center">
                                <button
                                    className={`${classNameColumnItem} text-primary fw-bold create-column`}
                                    onClick={() =>
                                        (window.location.href = "/setting?tab=databases")
                                    }
                                >
                                    <Icon
                                        dataFeather="plus"
                                        className="feather-xs stroke-width-4 me-2"
                                    />
                                    <span>Create column</span>
                                </button>
                                {columnAvailableList.map((item) => (
                                    <button
                                        key={item.name}
                                        className={classNameColumnItem}
                                        onClick={() => onAddColumnClick(item)}
                                    >
                                        <Icon
                                            dataFeather="plus"
                                            className="feather-xs stroke-width-4 me-2 text-primary"
                                        />
                                        <span>{item.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Spinner isFullHeight={false} />
            )}
        </Modal>
    );
};

export class LogViewTableSettingModalX extends Component {
    constructor(props) {
        super(props);

        const layout = this.generateLayout();

        this.state = {
            selectedTable: null,
            tableColumnList: [],
            layout,
            width: 300,
            height: 38,
        };

        this.onShow = this.onShow.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onHidden = this.onHidden.bind(this);
        this.generateLayout = this.generateLayout.bind(this);
        this.generateWidth = this.generateWidth.bind(this);
        this.generateHeight = this.generateHeight.bind(this);
        this.onChangeColumnWidth = this.onChangeColumnWidth.bind(this);
    }

    componentDidMount() {
        this.setState({ tableColumnList: [] });

        $(window).resize(() => {
            this.generateWidth();
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevShow = prevProps.show;
        const { show } = this.props;

        if (show && show !== prevShow) {
            this.setState({ tableColumnList: [] });
            this.onShow();
        }
    }

    onShow() {
        const { selectedTable } = this.props;
        const that = this;

        return LogViewActions.getColumnSetting(selectedTable.uuid).then((response) => {
            const { data, error } = response;

            if (error) {
                return;
            }

            that.setState({ tableColumnList: data }, () => {
                that.generateWidth();
            });
        });
    }

    onChange(name, visible, index, update = false, width = "") {
        if (!name) {
            return;
        }

        const that = this;
        const { onSave, selectedTable } = this.props;

        LogViewActions.updateColumnSetting(selectedTable.uuid, name, visible, index, width).then(
            (response) => {
                const { data, error } = response;

                if (error) {
                    return;
                }

                if (update) {
                    const columnSaving = undefined;
                    this.setState({ columnSaving });

                    that.onShow().then(() => {
                        if (typeof onSave === "function") {
                            onSave(data);
                        }
                    });
                }
            }
        );
    }

    onHidden() {
        const { onHidden } = this.props;

        this.setState({ tableColumnList: [] });

        if (typeof onHidden === "function") {
            onHidden();
        }
    }

    generateLayout() {
        if (typeof this.state === "undefined") {
            return [];
        }

        const { tableColumnList } = this.state;

        if (typeof tableColumnList === "undefined") {
            return [];
        }

        return tableColumnList.map((column) => {
            const x = column.visible ? 0 : 1;
            let y = parseInt(column.index) + 1;

            return {
                x: x,
                y: y,
                w: 1,
                h: 1,
                isResizable: false,
                i: column.name,
            };
        });
    }

    generateWidth() {
        const $this = this;

        $(() => {
            let width = $("#table-setting").find(".modal-body").width();
            setTimeout(() => {
                width = $("#table-setting").find(".modal-body").width();

                $this.setState({ width }, () => {
                    $this.generateHeight();
                });
            }, 200);
        });
    }

    generateHeight() {
        const $this = this;
        const { tableColumnList } = this.state;

        $(() => {
            setTimeout(() => {
                let defaultHeight = 50;
                let line = 1;
                let modalWidth = $("#table-setting").find(".modal-body").width();
                let columnWidth = (parseInt(modalWidth) - 40) / 2;

                tableColumnList.map((column) => {
                    const itemWidth = column.name.length * 10 + 20;

                    if (itemWidth > columnWidth) {
                        line = itemWidth / columnWidth + (itemWidth % columnWidth > 0 ? 1 : 0);
                        defaultHeight = 50;
                    }
                });
                const height = line * defaultHeight;
                $this.setState({ height });
            }, 500);
        });
    }

    onChangeColumnWidth(e) {
        const that = this;
        let { columnSaving, tableColumnList } = this.state;

        if (columnSaving) {
            clearTimeout(columnSaving);
        }

        const width = e.target.value;
        const { name, x, y, key } = e.target.dataset;

        tableColumnList[key].width = width;

        columnSaving = setTimeout(() => {
            if (!name || isNaN(x) || isNaN(y)) {
                return;
            }

            that.onChange(name, x !== 1, y, true, width);
        }, 500);

        this.setState({ columnSaving, tableColumnList });
    }

    render() {
        const { show, onHidden, onSave } = this.props;
        const { tableColumnList, layout, width, height } = this.state;

        return (
            <Modal
                title={"Table Setting"}
                id={"table-setting"}
                size={Size.large}
                saveButtonTitle={"Save"}
                show={show}
                saveButtonAction={onSave}
                showSaveButton={false}
                onHidden={onHidden}
            >
                <div className={"row"}>
                    {tableColumnList && tableColumnList.length > 0 && (
                        <GridLayout
                            className="col-12 grid-layout-el"
                            layout={layout}
                            onDragStop={(layout) => {
                                layout.map((item, index) => {
                                    if (item.y > 0) {
                                        this.onChange(
                                            item.i,
                                            item.x !== 1,
                                            item.y,
                                            index === layout.length - 1,
                                            "no-update"
                                        );
                                    }
                                });
                            }}
                            useCSSTransforms={true}
                            width={width}
                            cols={2}
                            rowHeight={height}
                        >
                            <div
                                key="viewable"
                                className="viewable text-center"
                                data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}
                            >
                                Viewable Columns
                            </div>
                            <div
                                key="available"
                                className="available text-center"
                                data-grid={{ x: 1, y: 0, w: 1, h: 1, static: true }}
                            >
                                Available Columns
                            </div>
                            {tableColumnList.map((item, index) => {
                                const x = item.visible ? 0 : 1;
                                let y = parseInt(item.index) + 1;
                                return (
                                    <div
                                        key={item.name}
                                        className="btn btn-default"
                                        style={{ wordBreak: "break-all" }}
                                        data-grid={{
                                            x: x,
                                            y: y,
                                            w: 1,
                                            h: 1,
                                            isResizable: false,
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                {item.title}
                                            </div>
                                            <div className="col-4 ps-0 pe-0">
                                                <Input
                                                    type="text"
                                                    className="ps-2 pe-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    data-key={index}
                                                    data-name={item.name}
                                                    data-x={x}
                                                    data-y={y - 1}
                                                    placeholder="Column Width"
                                                    value={item.width}
                                                    onChange={this.onChangeColumnWidth}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </GridLayout>
                    )}
                </div>
            </Modal>
        );
    }
}

LogViewTableSettingModal.propTypes = {
    show: PropTypes.bool,
    selectedTable: PropTypes.object,
    onHidden: PropTypes.func,
    onSave: PropTypes.func,
    showSaveButton: PropTypes.bool,
};
