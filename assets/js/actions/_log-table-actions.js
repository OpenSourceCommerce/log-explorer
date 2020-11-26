import {request} from '..';

const LogTableActions = {
    getOptions(query = {}) {
        const from = $('#date-range-from').val();
        const to = $('#date-range-to').val();
        if (from) {
            query.from = from;
        }

        if (to) {
            query.to = to;
        }

        return query;
    },
    getColumns() {
        return request('/stream/{uuid}/table?' + new URLSearchParams(this.getOptions()));
    },
    getSummary() {
        return request('/stream/{uuid}/summary?' + new URLSearchParams(this.getOptions()));
    },
    getGraph() {
        return request('/stream/{uuid}/graph?' + new URLSearchParams(this.getOptions()));
    }
};

export default LogTableActions;
