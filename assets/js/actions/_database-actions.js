import {request} from '..';

const DatabaseActions = {
    syncAll() {
        return request('/api/database/sync', {method: 'POST'});
    },
    getAllTable() {
        return request('/api/database/tables', {method: 'GET'});
    },
    getTableColumns(table, chunk = 0) {
        let url = '/api/database/' + table + '/columns';

        if (!isNaN(chunk) && chunk > 0) {
            url += '?chunk=' + chunk;
        }

        return request(url, {method: 'GET'});
    },
    createOrUpdate(tableId, table, columns) {
        if (tableId) {
            return request('/api/database/' + tableId, {
                method: 'PUT', body: JSON.stringify({
                    name: table,
                    columns
                })
            });
        }

        return request('/api/database/create', {
            method: 'POST', body: JSON.stringify({
                name: table,
                columns
            })
        });
    }
};

export default DatabaseActions;
