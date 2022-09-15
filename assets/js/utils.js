import moment from "moment";

export const PAGE_NAME = {
    dashboard: "Dashboard",
    table: "Table",
    user: "Users",
    alert: "Alert",
    profile: "Settings",
};

export const TOAST_STATUS = {
    failed: "danger",
    success: "success",
};

export const WIDGET_TYPE = {
    doughnut: 4,
    pie: 2,
    counterSum: 1,
    table: 3,
    line: 5,
    bar: 6,
};

export const SIDEBAR_STATUS_COOKIE_NAME = "sidebar_is_collapse";

export const setDataToCookies = (cName, cValue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
};

export const getDataFromCookies = (cName) => {
    let name = `${cName}=`;
    let cookieData = document.cookie.split(";");
    let data = null;
    cookieData.forEach((el) => {
        const item = el.trim();
        if (item.indexOf(name) === 0) {
            data = item.replace(name, "");
        }
    });
    return data;
};

export const DATE_RANGE = [
    { label: "1 hour", from: moment().subtract(1, "hour"), to: moment(), fromValue: 60 },
    { label: "12 hours", from: moment().subtract(12, "hour"), to: moment(), fromValue: 720 },
    { label: "1 day", from: moment().subtract(24, "hour"), to: moment(), fromValue: 1440 },
    { label: "7 days", from: moment().subtract(7, "days"), to: moment(), fromValue: 10080 },
    { label: "Today", from: moment(), to: moment() },
    { label: "Yesterday", from: moment().subtract(1, "days"), to: moment().subtract(1, "days") },
    { label: "This Month", from: moment().startOf("month"), to: moment().endOf("month") },
    {
        label: "Last Month",
        from: moment().subtract(1, "month").startOf("month"),
        to: moment().subtract(1, "month").endOf("month"),
    },
];

export const generateRandomColor = (withAlpha) => {
    const o = Math.round,
        r = Math.random,
        s = 255;

    if (!withAlpha) {
        return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)})`;
    } else {
        const colorCode = `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)}`;
        const colorCodeWithAlpha = `${colorCode}, 0.5)`;

        return [`${colorCode}`, colorCodeWithAlpha];
    }
};

export const generateColorWithAlpha = (color) => {
    return [color, color.slice(0, -1).concat(",0.5)")];
};

export const generateDataBaseOnColumn = (column = [], size = 5) => {
    let data = [];
    for (let i = 0; i < size; i++) {
        const obj = {};
        column.forEach((item) => {
            const randomPosition = Math.floor(Math.random() * 19) + 1;
            if (item === "value") obj[item] = SAMPLE_DATA[randomPosition].value;
            else obj[item] = SAMPLE_DATA[randomPosition].label;
        });
        data.push(obj);
    }
    return data;
};

export const SAMPLE_DATA = [
    {
        label: "Bergoo",
        value: 931,
    },
    {
        label: "Carlos",
        value: 296,
    },
    {
        label: "Groveville",
        value: 587,
    },
    {
        label: "Carrizo",
        value: 645,
    },
    {
        label: "Broadlands",
        value: 581,
    },
    {
        label: "Jennings",
        value: 234,
    },
    {
        label: "Whitestone",
        value: 350,
    },
    {
        label: "Harborton",
        value: 545,
    },
    {
        label: "Spelter",
        value: 178,
    },
    {
        label: "Stockwell",
        value: 199,
    },
    {
        label: "Oceola",
        value: 636,
    },
    {
        label: "Bluffview",
        value: 840,
    },
    {
        label: "Oley",
        value: 942,
    },
    {
        label: "Staples",
        value: 994,
    },
    {
        label: "Emison",
        value: 876,
    },
    {
        label: "Cuylerville",
        value: 690,
    },
    {
        label: "Saranap",
        value: 188,
    },
    {
        label: "Sanborn",
        value: 106,
    },
    {
        label: "Tibbie",
        value: 229,
    },
    {
        label: "Bascom",
        value: 144,
    },
];
