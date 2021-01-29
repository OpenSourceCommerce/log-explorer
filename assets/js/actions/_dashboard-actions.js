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
    },
    addWidget(dashboardId, widgetId, options) {
        return request(`/api/dashboard/${dashboardId}/add/${widgetId}`, {method: 'POST', body: JSON.stringify(options)});
    },
    updateWidget(dashboardId, widgetId, options) {
        return request(`/api/dashboard/${dashboardId}/update/${widgetId}`, {method: 'POST', body: JSON.stringify(options)});
    },
    removeWidget(dashboardId, widgetId) {
        return request(`/api/dashboard/${dashboardId}/remove/${widgetId}`, {method: 'DELETE'});
    }
};

export default DashboardActions;
