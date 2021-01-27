import {request} from '..';

const DashboardActions = {
    createOrUpdate(id, data) {
        if (id) {
            return request('/api/dashboard/' + id, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/dashboard/create', {method: 'POST', body: JSON.stringify(data)});
    },
    loadDashboard(id) {
        return request('/api/dashboard/' + id);
    },
    deleteDashboard(id) {
        return request('/api/dashboard/' + id, {method: 'DELETE'});
    },
    listDashboard() {
        return request('/api/dashboard');
    }
};

export default DashboardActions;
