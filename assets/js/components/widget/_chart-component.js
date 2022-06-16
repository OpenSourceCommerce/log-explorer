import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ArcElement,
    LineElement,
} from "chart.js";
import { Doughnut, Pie, Line, Bar } from "react-chartjs-2";
import { WIDGET_TYPE } from "../../utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const ChartJsComponent = ({ type, ...props }) => {
    let component;
    switch (type) {
        case WIDGET_TYPE.doughnut: {
            component = <Doughnut {...props} />;
            break;
        }
        case WIDGET_TYPE.pie: {
            component = <Pie {...props} />;
            break;
        }
        case WIDGET_TYPE.bar: {
            component = <Bar {...props} />;
            break;
        }
        case WIDGET_TYPE.line: {
            component = <Line {...props} />;
            break;
        }
        default: {
            component = null;
            break;
        }
    }
    return component;
};
