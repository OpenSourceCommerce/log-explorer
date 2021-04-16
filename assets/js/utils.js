import moment from "moment";
import {Alert} from "./actions";

export const PAGE_NAME = {
    dashboard: 'Dashboard',
    table: 'Table'
};

export const WIDGET_TYPE = {
    doughnut: '4',
    pie: '2',
    counterSum: '1',
    table: '3'
}

export const setDataToCookies = (cName, cValue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
}

export const getDataFromCookies = (cName) => {
    let name = `${cName}=`;
    let cookieData = document.cookie.split(';');
    let data = null;
    cookieData.forEach((el) => {
        const item = el.trim();
        if (item.indexOf(name) === 0) {
            data = item.replace(name, '');
        }
    })
    return data;
}

export const DATE_RANGE = [
    { label: '1 hour', from: moment().subtract(1, 'hour'), to: moment(), fromValue: 60},
    { label: '12 hours', from: moment().subtract(12, 'hour'), to: moment(), fromValue: 720},
    { label: '1 day', from: moment().subtract(24, 'hour'), to: moment(), fromValue: 1440},
    { label: '7 days', from: moment().subtract(7, 'days'), to: moment(), fromValue: 10080},
    { label: 'Today', from: moment(), to: moment()},
    { label: 'Yesterday', from: moment().subtract(1, 'days'), to: moment().subtract(1, 'days')},
    { label: 'This Month', from: moment().startOf('month'), to: moment().endOf('month')},
    { label: 'Last Month', from:moment().subtract(1, 'month').startOf('month'), to: moment().subtract(1, 'month').endOf('month')},
]

export const saveToClipboard = (text, notificationText) => {
    const dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    if (notificationText) {
        Alert.success(notificationText);
    }
}
