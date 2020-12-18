import {request} from '..';

const LogViewActions = {
    getAll() {
        return request('/api/logview/list');
    },

    getColumnSetting(uuid, chunk = 0) {
        if (!uuid) {
            return;
        }

        let url = `/api/logview/${uuid}/setting/columns`;

        if (!isNaN(chunk) && chunk > 0) {
            url += '?chunk=' + chunk;
        }

        return request(url, {method: 'GET'});
    },

    updateColumnSetting(uuid, columnId, visible) {
        if (!uuid) {
            return;
        }

        const url = `/api/logview/${uuid}/setting/columns`;

        const body = JSON.stringify({
            column: columnId,
            visible: visible ? 1 : 0
        });

        return request(url, {method: 'PUT', body});
    },
    setSummary(uuid, data) {
        return request('/api/logview/' + uuid + '/summary', {method: 'PUT', body: JSON.stringify(data)});
    },
    loadLogView(uuid) {
        return request('/api/logview/' + uuid);
    }
};

export default LogViewActions;
