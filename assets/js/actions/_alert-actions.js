import {request} from '..';

const AlertActions = {
    createOrUpdate(id, data) {
        if (id) {
            return request('/api/alert/' + id, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/alert', {method: 'POST', body: JSON.stringify(data)});
    },
    updateStatus(id) {
        return request('/api/alert/' + id + '/status', {method: "PUT"});
    },
    loadAlert(id) {
        return request('/api/alert/' + id);
    },
    deleteAlert(id) {
        return request('/api/alert/' + id, {method: 'DELETE'});
    },
    listAlert() {
        return request('/api/alert');
    }
};

export default AlertActions;
