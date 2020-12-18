import {request} from '..';

const DatabaseActions = {
    syncAll() {
        return request('/api/table/sync', {method: 'POST'});
    },
    getAllTable() {
        return request('/api/table', {method: 'GET'});
    },
    getTableColumns(table, chunk = 0) {
        let url = '/api/table/' + table + '/columns';

        if (!isNaN(chunk) && chunk > 0) {
            url += '?chunk=' + chunk;
        }

        return request(url, {method: 'GET'});
    },
    createOrUpdate(tableId, data) {
        if (tableId) {
            return request('/api/table/' + tableId, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/table/create', {
            method: 'POST', body: JSON.stringify(data)
        });
    }
};

export default DatabaseActions;
