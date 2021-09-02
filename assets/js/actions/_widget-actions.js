import {request} from '..';

const WidgetActions = {
    createOrUpdate(id, data) {
        if (id) {
            return request('/api/widget/' + id, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/widget/create', {method: 'POST', body: JSON.stringify(data)});
    },
    loadWidget(id) {
        return request('/api/widget/' + id);
    },
    deleteWidget(id) {
        return request('/api/widget/' + id, {method: 'DELETE'});
    },
    listWidget() {
        return request('/api/widget');
    },
    getQueries() {
        return request('/api/widget/queries/list');
    },
    saveQueries(id, data) {
        const body = JSON.stringify(data);
        if (id) {
            return request('/api/widget/queries/' + id, {method: 'PUT', body});
        } else {
            return request('/api/widget/queries', {method: 'POST', body});
        }
    },
    deleteQueries(id) {
        return request('/api/widget/queries/' + id, {method: 'DELETE'});
    },
};

export default WidgetActions;
