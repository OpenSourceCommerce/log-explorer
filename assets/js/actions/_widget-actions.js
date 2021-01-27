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
    }
};

export default WidgetActions;
