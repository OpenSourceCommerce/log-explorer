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
    getUuid() {
        return window.uuid ? window.uuid : 'default';
    },
    getColumns() {
        return request('/stream/' + this.getUuid() + '/table?' + new URLSearchParams(this.getOptions()));
    },
    getSummary() {
        return request('/stream/' + this.getUuid() + '/summary?' + new URLSearchParams(this.getOptions()));
    },
    getGraph() {
        return request('/stream/' + this.getUuid() + '/graph?' + new URLSearchParams(this.getOptions()));
    }
};

export default LogTableActions;
