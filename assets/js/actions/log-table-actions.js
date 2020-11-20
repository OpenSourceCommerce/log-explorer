import {request} from '..';

const logTableActions = {
    getColumns() {
        return request('/stream/{uuid}/table');
    }
};

export default logTableActions;
