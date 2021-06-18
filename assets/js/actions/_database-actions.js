import {request} from '..';

const DatabaseActions = {
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
    createOrUpdate(table, data) {
        if (table) {
            return request('/api/table/' + table, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/table/create', {
            method: 'POST', body: JSON.stringify(data)
        });
    },
    deleteColumn(table, column) {
        return request('/api/table/' + table + '/' + column, {
            method: 'DELETE'
        });
    },
    syncAll() {
        return request('/database/sync', {method: 'POST'});
    }
};

export default DatabaseActions;
