import {request} from '..';

const ExportActions = {
    exportData(table, format, filter) {
        filter = JSON.stringify(filter)
        const body = JSON.stringify({filter, format, table})

        const url = '/api/export'

        return request(url, {method: 'POST', body})
    },
    listExport() {
        return request('/api/export');
    }
};

export default ExportActions;
