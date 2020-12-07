import {request} from '..';

const DatabaseActions = {
    runQuery(data) {
        return request('/database/query', {method: 'POST', body: JSON.stringify(data)});
    }
};

export default DatabaseActions;
