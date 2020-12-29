import {request} from '..';
import {CsrfToken} from '.';

const UserActions = {
    getAllUser() {
        return request('/api/user', {method: 'GET'});
    },
    getUser(id) {
        return request('/api/user/' + id, {method: 'GET'});
    },
    getProfile() {
        return request('/api/profile', {method: 'GET'});
    },
    updateMe(data) {
        return request('/api/profile', {method: 'PUT', body: JSON.stringify(data)});
    },
    confirm(token, data) {
        return request('/api/confirmation/' + token, {method: 'PUT', body: JSON.stringify(data)});
    },
    setStatus(id, data) {
        return request('/api/user/status/' + id, {method: 'PUT', body: JSON.stringify(data)});
    },
    delete(id) {
        return request('/api/user/' + id, {method: 'DELETE'});
    },
    createOrUpdate(userId, data) {
        if (userId) {
            return request('/api/user/' + userId, {method: 'PUT', body: JSON.stringify(data)});
        }

        return request('/api/user/create', {
            method: 'POST', body: JSON.stringify(data)
        });
    },
    changePassword: (oldPassword, password) => {
        const jData = {
            _token: CsrfToken.getToken(),
            oldPassword,
            password
        };
        return request('/api/user/password', {
            method: 'post',
            body: JSON.stringify(jData)
        });
    },
    forgot: email => {
        const jData = {
            _token: CsrfToken.getToken(),
            email
        };
        return request('/api/password/forgot', {
            method: 'post',
            body: JSON.stringify(jData)
        });
    },
    setPassword: (password, token) => {
        const jData = {
            _token: CsrfToken.getToken(),
            token,
            password
        };
        return request('/api/password/reset', {
            method: 'post',
            body: JSON.stringify(jData)
        });
    },
    login: (email, password, remember) => {
        const jData = {
            _token: CsrfToken.getToken(),
            email,
            password,
            _remember_me: remember
        };
        return request('/login', {
            method: 'post',
            body: JSON.stringify(jData)
        });
    }
};

export default UserActions;
