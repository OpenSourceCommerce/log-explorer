import {request} from '..';

const LogTableActions = {
    getOptions(query = {}) {
        const from = $('#date-range-from').val();
        const to = $('#date-range-to').val();
        const filter = $('#filter-text').val();
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
    getWidget(uuid, widgetId) {
        return request(`/api/stream/widget/${uuid}/${widgetId}?${new URLSearchParams(this.getOptions())}`);
    }
};

export default LogTableActions;
