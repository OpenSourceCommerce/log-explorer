import React, { useState, useEffect } from "react";
import { Button, FilterText, FormField, Spinner, Colors } from "../index";
import { generateDataBaseOnColumn, SAMPLE_DATA, WIDGET_TYPE } from "../../utils";
import { Alert, DatabaseActions, LogTableActions, WidgetActions } from "../../actions";
import isEqual from "lodash/isEqual";
import { Chart } from "./_chart";
import { CounterSum } from "./_counter-sum";
import { WidgetDataTable } from "./_table";
import { AlertMessage } from "../_alert-message";

const WIDGET = [
    { label: "Doughnut", value: WIDGET_TYPE.doughnut },
    { label: "Pie", value: WIDGET_TYPE.pie },
    { label: "Counter Sum", value: WIDGET_TYPE.counterSum },
    { label: "Table", value: WIDGET_TYPE.table },
    { label: "Bar", value: WIDGET_TYPE.bar },
    { label: "Line", value: WIDGET_TYPE.line },
];
const MANDATORY_FIELD = ["title", "type", "table", "order", "column", "size"];

const ORDER_FIELD_VALUE = {
    asc: "asc",
    desc: "desc",
};

const INVISIBLE_FIELD_IN_COUNTER_SUM = ["order", "size"];

const WidgetLayout = ({ type, title, size, column, id }) => {
    let component = null;
    switch (type) {
        case WIDGET_TYPE.doughnut:
        case WIDGET_TYPE.pie:
        case WIDGET_TYPE.bar:
        case WIDGET_TYPE.line: {
            component = (
                <Chart id={id} type={type} size={size} data={[...SAMPLE_DATA].splice(0, size)} />
            );
            break;
        }
        case WIDGET_TYPE.counterSum: {
            component = <CounterSum data={SAMPLE_DATA.length} />;
            break;
        }
        case WIDGET_TYPE.table: {
            const sizeData = size;
            let columnData = column && column.length > 0 ? column : ["example_data"];
            columnData = [...columnData, "value"];
            component = (
                <WidgetDataTable
                    className="limit-height"
                    data={generateDataBaseOnColumn(columnData, sizeData)}
                    column={columnData}
                    isDashboardComponent={true}
                />
            );
            break;
        }
    }

    return component;
};

export const WidgetManagement = ({
    widgetDetail: passedWidgetDetail,
    tables,
    onSubmitDataSuccess,
    isShow,
}) => {
    const [mandatoryFields, setMandatoryFields] = useState(MANDATORY_FIELD);
    const [widgetDetail, setWidgetDetail] = useState(passedWidgetDetail);
    const [columns, setColumns] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [columnLoading, setColumnLoading] = useState(false);
    const [alertErrorMessage, setAlertErrorMessage] = useState();
    const [queryObj, setQueryObj] = useState({ id: null, query: "", name: "" });
    const [queryNameErrorMessage, setQueryNameErrorMessage] = useState();
    const [queryError, setQueryError] = useState(false);
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        loadQueries();
    }, []);

    //Reset the state for widgetDetail before show Modal
    useEffect(() => {
        if(isShow){
            setWidgetDetail(passedWidgetDetail);
            setErrors([]);
        }
    },[isShow])

    useEffect(() => {
        setIsLoading(true);
        setWidgetDetail({
            ...passedWidgetDetail,
            column: Array.isArray(passedWidgetDetail.column)
                ? passedWidgetDetail.column.map((item) => item)
                : passedWidgetDetail.column,
        });
        setErrors([]);
        setAlertErrorMessage();
        setIsLoading(false);
    }, [passedWidgetDetail]);

    useEffect(() => {
        const loadColumnList = async () => {
            const { table } = widgetDetail;
            setColumnLoading(true);
            let columnList = table ? await loadColumn(table) : [];
            setColumns(columnList);
            setColumnLoading(false);
        };
        loadColumnList();
    }, [widgetDetail.table]);

    const loadColumn = async (tableName) => {
        const columnRes = await DatabaseActions.getTableColumns(tableName);
        return columnRes && columnRes.data && columnRes.data.length > 0
            ? columnRes.data.map((item) => ({
                  value: item.name,
                  label: item.name,
              }))
            : [];
    };

    const onChangeData = async ({ name, value }) => {
        let newWidgetDetail = { ...widgetDetail };
        let newErrors = [...errors].filter((item) => item !== name);
        let newValue = name === "type" && !!value ? parseInt(value) : value;

        if (name) {
            if (name === "table") {
                let column = "";
                if (widgetDetail.type === WIDGET_TYPE.table) {
                    column = [];
                }
            } else if (name === "type") {
                let newMandatoryFieldArray = [...mandatoryFields];
                if (newValue === WIDGET_TYPE.counterSum) {
                    newMandatoryFieldArray = newMandatoryFieldArray.filter(
                        (item) => !INVISIBLE_FIELD_IN_COUNTER_SUM.includes(item)
                    );
                } else {
                    INVISIBLE_FIELD_IN_COUNTER_SUM.forEach((item) => {
                        if (!newMandatoryFieldArray.includes(item)) {
                            newMandatoryFieldArray.push(item);
                        }
                    });
                }
                setMandatoryFields([...newMandatoryFieldArray]);

                let column = widgetDetail.column;
                if (newValue === WIDGET_TYPE.table) {
                    column = [];
                } else {
                    if (Array.isArray(column)) {
                        column = "";
                    }
                }

                newWidgetDetail = { ...widgetDetail, column };
            } else if (name === "column" && widgetDetail.type === WIDGET_TYPE.table) {
                newValue = newValue.trim();

                let currentValue = widgetDetail.column;

                if (typeof currentValue === "string") {
                    currentValue = currentValue.split(",");
                }

                if (!currentValue) {
                    currentValue = [];
                    currentValue.push(value);
                } else {
                    const index = currentValue.indexOf(value);

                    if (index >= 0) {
                        currentValue = currentValue.filter((item) => item !== value);
                    } else {
                        currentValue.push(value);
                    }
                }

                newValue = currentValue;
            }
            if (mandatoryFields.includes(name) && !value) {
                newErrors.push(name);
            }

            newWidgetDetail = {
                ...newWidgetDetail,
                [name]: newValue,
            };
            setWidgetDetail({ ...newWidgetDetail });
            setErrors(newErrors);
            setAlertErrorMessage();
        }
    };

    const generateOption = (data, field) => {
        let options = data;
        if (field === "order") {
            options = [
                { value: ORDER_FIELD_VALUE.asc, label: "Ascending" },
                { value: ORDER_FIELD_VALUE.desc, label: "Descending" },
            ];
        } else if (field === "size") {
            options = [
                { value: "1", label: "1" },
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "20", label: "20" },
            ];
        } else if (field === "type") {
            options = [...WIDGET];
        }

        if (options && options.length > 0) {
            const isGenerateDataForColumnWithTableType =
                widgetDetail.type === WIDGET_TYPE.table && field === "column";

            const isInvisibleNullOption = isGenerateDataForColumnWithTableType || field === "order";
            return (
                <>
                    {!isInvisibleNullOption && <option value="">{`Select ${field}`}</option>}
                    {options.map((item, index) => {
                        const { value, label } = item;
                        return (
                            <option value={value} key={index}>
                                {label}
                            </option>
                        );
                    })}
                </>
            );
        } else {
            return null;
        }
    };

    const loadQueries = async () => {
        const res = await WidgetActions.getQueries();
        const { error, data } = res;
        if (error === 0) {
            setQueries(data);
        }
    };

    const onSaveClicked = async () => {
        if (!queryObj.name) {
            setQueryNameErrorMessage("Please input query name");
            return;
        }
        if (!queryObj.query) {
            setQueryError(true);
            return;
        }
        const res = await WidgetActions.saveQueries(queryObj.id, queryObj);
        const { error } = res;
        if (error === 0) {
            Alert.success("Save query success");
            loadQueries();
        }
    };

    const onQueryNameChanged = ({ value }) => {
        setQueryNameErrorMessage();
        setQueryObj({
            ...queryObj,
            name: value,
        });
    };

    const onDeleteCLicked = async (query) => {
        const res = await WidgetActions.deleteQueries(query.id);
        const { error } = res;
        if (error === 0) {
            Alert.success("Delete successful");
            const newQueryList = queries.filter((item) => item.id !== query.id);
            setQueries([...newQueryList]);
        }
    };

    const onSubmit = async () => {
        let errors = [];
        mandatoryFields.forEach((item) => {
            let isInvalidField = false;
            if (!widgetDetail[item]) {
                isInvalidField = true;
            } else if (Array.isArray(widgetDetail[item])) {
                if (widgetDetail[item].length === 0) {
                    isInvalidField = true;
                }
            }
            if (isInvalidField) {
                errors = [...errors, item];
            }
        });

        if (errors.length === 0) {
            const { id } = widgetDetail;
            let payload = Object.entries(widgetDetail).reduce((obj, [key, value]) => {
                if (key === "order") {
                    obj.isOrderDesc = value === "desc";
                } else if (key === "column" && Array.isArray(value)) {
                    obj.column = value.join(",");
                } else {
                    obj[key] = value;
                }
                return obj;
            }, {});

            const resp = await WidgetActions.createOrUpdate(id, payload);

            if (resp && !resp.error) {
                onSubmitDataSuccess(!!id);
            } else {
                setAlertErrorMessage(resp.message);
            }
        } else {
            setErrors(errors);
        }
    };

    useEffect(() => {
        const query = queries.find((item) => item.query === widgetDetail.query);
        if (query) {
            setQueryObj(query);
        } else {
            setQueryObj({
                ...queryObj,
                query: widgetDetail.query,
            });
        }
    }, [widgetDetail.query, queries]);

    const { id, title, type, table, column, order, size, query } = widgetDetail;

    const isCounterSumType = type == WIDGET_TYPE.counterSum;

    const isDisableSaveButton =
        isEqual(passedWidgetDetail, widgetDetail) ||
        Object.keys(errors).length > 0 ||
        alertErrorMessage;

    const clearQueryButton = (
        <div className="input-group-append">
            <Button
                className="btn-bg-white"
                id="btn-filter-save"
                outlineColor={Colors.blue}
                onClick={(e) => {
                    e.preventDefault();
                    setQueryObj({ id: null, query: "", name: "" });
                    setWidgetDetail({
                        ...widgetDetail,
                        query: '',
                    })
                }}
            >
                Clear
            </Button>
        </div>
    );

    return (
        <div className="editable-widget">
            {!isLoading ? (
                <div className="row parent-row">
                    <div className="col col-md-6 widget-info">
                        <AlertMessage message={alertErrorMessage} />
                        <FormField
                            className="mb-3"
                            label="Header"
                            value={title}
                            placeholder="Input header"
                            fieldName="title"
                            onChange={(e) => onChangeData(e.target)}
                            onBlur={(e) => onChangeData(e.target, true)}
                            isMandatory={mandatoryFields.includes("title")}
                            errors={errors}
                        />
                        <FormField
                            className="mb-3"
                            label="Widget Type"
                            value={type}
                            fieldName="type"
                            onChange={(e) => onChangeData(e.target, true)}
                            isMandatory={mandatoryFields.includes("type")}
                            type="select"
                            errors={errors}
                        >
                            {generateOption(null, "type")}
                        </FormField>
                        <FormField
                            className="mb-3"
                            label="Datatable"
                            value={table}
                            fieldName="table"
                            onChange={(e) => onChangeData(e.target)}
                            isMandatory={mandatoryFields.includes("table")}
                            type="select"
                            errors={errors}
                        >
                            {generateOption(tables, "table")}
                        </FormField>
                        <div className="mb-3">
                            <FormField
                                label="Column"
                                value={column}
                                fieldName="column"
                                onChange={(e) => onChangeData(e.target, true)}
                                isMandatory={mandatoryFields.includes("column")}
                                type="select"
                                errors={errors}
                                disabled={!table || columnLoading}
                                multiple={type == WIDGET_TYPE.table}
                            >
                                {generateOption(columns, "column")}
                            </FormField>
                            {type == WIDGET_TYPE.table && (
                                <small className="fst-italic">* Can select multiple columns</small>
                            )}
                        </div>
                        {!isCounterSumType && (
                            <div className="row">
                                <FormField
                                    className="col-12 col-md-6 pt-md-0 mb-3"
                                    label="Order"
                                    value={order}
                                    fieldName="order"
                                    onChange={(e) => onChangeData(e.target)}
                                    isMandatory={mandatoryFields.includes("order")}
                                    type="select"
                                    errors={errors}
                                >
                                    {generateOption(null, "order")}
                                </FormField>
                                <FormField
                                    className="col-12 col-md-6 pt-md-0 mb-3"
                                    label="Size"
                                    value={size}
                                    fieldName="size"
                                    onChange={(e) => onChangeData(e.target, true)}
                                    isMandatory={mandatoryFields.includes("size")}
                                    type="select"
                                    errors={errors}
                                >
                                    {generateOption(null, "size")}
                                </FormField>
                            </div>
                        )}
                        <div className="mb-3">
                            <FormField
                                label="Filter Name (Optional)"
                                value={queryObj?.name}
                                fieldName="filterName"
                                placeholder="z. B. hostname filter"
                                onChange={(e) => onQueryNameChanged(e.target)}
                                errorMessage={queryNameErrorMessage}
                            />
                            <div
                                className="form-text text-muted fw-light m-0"
                                style={{ fontSize: "12px" }}
                            >
                                Needed when saving the filter
                            </div>
                        </div>
                        <div className="form-field form-group mb-3">
                            <label className="mb-1">Filter</label>
                            <FilterText
                                fieldName="query"
                                value={query}
                                queries={queries}
                                isVisibleEditQuery={false}
                                onQuerySelected={(value) =>
                                    onChangeData({
                                        name: "query",
                                        value,
                                    })
                                }
                                onSaveClicked={onSaveClicked}
                                onDeleteCLicked={onDeleteCLicked}
                                placeholder="status = 200 AND url LIKE '%product%'"
                                onBlur={(e) => onChangeData(e.target)}
                                isModalShow = {isShow}
                            />
                        </div>
                        <div className="float-end">
                            <Button
                                className="btn-search mt-3"
                                color={Colors.blue}
                                onClick={() => onSubmit()}
                                disabled={isDisableSaveButton}
                            >
                                {`${id ? "Update" : "Create"}`}
                            </Button>
                        </div>
                    </div>
                    <div className="col col-md-6">
                        Preview
                        {type ? (
                            <WidgetLayout {...widgetDetail} />
                        ) : (
                            <p className="d-flex justify-content-center align-items-center h-75">
                                Not selected widget type yet.
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
