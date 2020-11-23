import {request} from '..';

const logTableActions = {
    getColumns() {
        return request('/stream/{uuid}/table');
    },
    getSummary() {
        return request('/stream/{uuid}/summary');
    }
};

export default logTableActions;
