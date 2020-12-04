import {request} from '..';

const DatabaseActions = {
    createTable(data) {
        return request('/database/create', {method: 'POST', body: JSON.stringify(data)});
    }
};

export default DatabaseActions;
