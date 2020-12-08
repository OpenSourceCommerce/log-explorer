import {request} from '..';

const DatabaseActions = {
    runQuery(data) {
        return request('/database/query', {method: 'POST', body: JSON.stringify(data)});
    },
    syncAll() {
        return request('/database/sync', {method: 'POST'});
    },
    getAllTable() {
        return request('/database/tables', {method: 'GET'});
    },
    getTableColumns(table) {
        return request('/database/' + table + '/columns', {method: 'GET'});
    }
};

export default DatabaseActions;
