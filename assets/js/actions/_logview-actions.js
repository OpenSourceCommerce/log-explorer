import {request} from '..';

const LogViewActions = {
    update(uuid, data) {
        return request('/api/logview/' + uuid, {method: 'PUT', body: JSON.stringify(data)});
    },
    setSummary(uuid, data) {
        return request('/api/logview/' + uuid + '/summary', {method: 'PUT', body: JSON.stringify(data)});
    },
    loadLogView(uuid) {
        return request('/api/logview/' + uuid);
    }
};

export default LogViewActions;
