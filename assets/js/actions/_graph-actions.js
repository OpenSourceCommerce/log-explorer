import {request} from '..';

const GraphActions = {
    createOrUpdate(id, data) {
        if (id) {
            return request('/api/graph/' + id, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/graph/create', {method: 'POST', body: JSON.stringify(data)});
    },
    loadGraph(id) {
        return request('/api/graph/' + id);
    }
};

export default GraphActions;
