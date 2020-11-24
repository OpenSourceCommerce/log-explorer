import {request} from '..';

const LogTableActions = {
    getColumns() {
        return request('/stream/{uuid}/table');
    },
    getSummary() {
        return request('/stream/{uuid}/summary');
    },
    getGraph() {
        return request('/stream/{uuid}/graph');
    }
};

export default LogTableActions;
