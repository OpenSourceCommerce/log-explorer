import {request} from '..';

const LogTableActions = {
    getOptions(query = {}, filterQuery) {
        const from = $('#date-range-from').val();
        const to = $('#date-range-to').val();
        const filter = filterQuery || $('#filter-text').val();
        if (from) {
            query.from = from;
        }

        if (to) {
            query.to = to;
        }

        if (filter) {
            query.filter = filter;
        }

        return query;
    },
    getUuid(uuid) {
        return uuid ? uuid : 'default';
    },
    getColumns(uuid) {
        return request('/api/stream/' + this.getUuid(uuid) + '/table?' + new URLSearchParams(this.getOptions()));
    },
    getSummary(uuid) {
        return request('/api/stream/' + this.getUuid(uuid) + '/summary?' + new URLSearchParams(this.getOptions()));
    },
    getGraph(uuid) {
        return request('/api/stream/' + this.getUuid(uuid) + '/graph?' + new URLSearchParams(this.getOptions()));
    },
    getDashboards() {
        return request('/api/stream/dashboards');
    },
    getDashboard(uuid) {
        return request(`/api/stream/dashboard/${uuid}`);
    },
    getWidget(uuid, widgetId, filterQuery) {
        return request(`/api/stream/widget/${uuid}/${widgetId}?${new URLSearchParams(this.getOptions({}, filterQuery))}`);
    },
    getQueries(uuid) {
        return request('/api/logview/' + uuid + '/queries');
    },
    saveQueries(uuid, data, id = '') {
        const body = JSON.stringify(data);
        if (id) {
            return request('/api/logview/queries/' + id, {method: 'PUT', body});
        } else {
            return request('/api/logview/' + uuid + '/queries', {method: 'POST', body});
        }
    },
    deleteQueries(id) {
        return request('/api/logview/queries/' + id, {method: 'DELETE'});
    },
};

export default LogTableActions;
