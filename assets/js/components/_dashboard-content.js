import React, { useEffect, useState } from "react";
import { generateRandomColor } from "../utils";
import EmptyWidgetImage from "../../images/empty-widget.png";
import { Button, Colors, Icon, Image, WidgetListModal } from ".";

const EmptyWidgetContent = ({ onAddWidgetClicked }) => {
    return (
        <div className="dashboard-empty-widget d-flex flex-column justify-content-center align-items-center">
            <Image src={EmptyWidgetImage} className="empty-widget-icon" />
            <div className="sub-title fs-4 fw-bold mt-2">Pretty empty here</div>
            <div className="sub-title fs-4 mt-1 mb-2">Let’s add your first widget</div>
            <Button className="fs-6" outlineColor={Colors.blue} onClick={onAddWidgetClicked}>
                <Icon dataFeather="plus" className="stroke-width-4 feather-sm" />
                <span className="align-middle ms-1 fw-bold">Add widget</span>
            </Button>
        </div>
    );
};

export const DashboardContent = ({ dashboardDetail: passedDashboardDetail }) => {
    const [dashboardDetail, setDashboardDetail] = useState({});
    const [widgets, setWidgets] = useState([]);
    const [visibleAddWidgetModal, setVisibleAddWidgetModal] = useState(false);

    useEffect(() => {
        if (passedDashboardDetail) {
            setDashboardDetail(passedDashboardDetail?.data);
            loadData();
        }
    }, [passedDashboardDetail]);

    const loadData = async () => {
        const { widgets = [], data = {}, configs = {} } = passedDashboardDetail;

        const widgetList = await getWidgetDetail(widgets, configs, data?.uuid);

        setWidgets(widgetList.map((item) => item));
    };

    const getWidgetDetail = async (widgets, configs, uuid, query) => {
        let data = [];
        if (widgets && widgets.length > 0) {
            const rawWidget = widgets.map((item) =>
                LogTableActions.getWidget(uuid, item.widget_id, query)
            );
            const widgetRes = await Promise.all(rawWidget);

            data =
                widgetRes &&
                widgetRes.length > 0 &&
                widgetRes.reduce((arr, item, index) => {
                    const { error, data } = item;
                    const {
                        id,
                        x,
                        y,
                        width,
                        height,
                        fixed,
                        title,
                        type,
                        widget_id,
                        color,
                        w,
                        h,
                    } = widgets[index];
                    const { minWidth, minHeight } = configs.size[type];

                    let colorForChart;
                    if (color && color.length > 0 && color.length === data.length) {
                        colorForChart = color;
                    } else if (
                        type.toString() === WIDGET_TYPE.doughnut ||
                        type.toString() === WIDGET_TYPE.pie ||
                        type.toString() === WIDGET_TYPE.bar ||
                        type.toString() === WIDGET_TYPE.line
                    ) {
                        colorForChart = data.reduce((arr) => {
                            const colorCode = generateRandomColor();
                            if (!arr.includes(colorCode)) {
                                arr.push(colorCode);
                            }
                            return arr;
                        }, []);
                    }
                    arr.push({
                        ...widgets[index],
                        data,
                        i: id.toString(),
                        x,
                        y,
                        w: w || width,
                        h: h || height,
                        minW: minWidth,
                        minH: minHeight,
                        static: !!fixed,
                        title,
                        widget_id,
                        type: type.toString(),
                        color: colorForChart,
                        duration: 1000,
                    });
                    return arr;
                }, []);
        }
        return data;
    };

    return (
        <div className="dashboard-content mt-3">
            {widgets && widgets.length > 0 ? (
                <>{dashboardDetail?.title}</>
            ) : (
                <EmptyWidgetContent onAddWidgetClicked={() => setVisibleAddWidgetModal(true)} />
            )}

            <WidgetListModal
                isShow={visibleAddWidgetModal}
                onHidden={() => setVisibleAddWidgetModal(false)}
                isSpinnerFullHeight={false}
            />
        </div>
    );
};
