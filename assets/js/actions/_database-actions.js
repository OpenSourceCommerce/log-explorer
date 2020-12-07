import {request} from '..';

const DatabaseActions = {
    runQuery(data) {
        return request('/database/query', {method: 'POST', body: JSON.stringify(data)});
    },
    syncAll() {
        return request('/database/sync', {method: 'POST'});
    }
};

export default DatabaseActions;
