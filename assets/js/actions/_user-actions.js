import {request} from '..';

const UserActions = {
    getAllUser() {
        return request('/api/user', {method: 'GET'});
    },
    getUser(id) {
        return request('/api/user/' + id, {method: 'GET'});
    },
    confirm(token, data) {
        return request('/api/confirmation/' + token, {method: 'PUT', body: JSON.stringify(data)});
    },
    createOrUpdate(userId, data) {
        if (userId) {
            return request('/api/user/' + userId, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/user/create', {
            method: 'POST', body: JSON.stringify(data)
        });
    }
};

export default UserActions;
