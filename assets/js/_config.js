import {Alert, Event} from './actions';

export const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export const request = (requestURL, parameters = {}, throwError = true) => {
    requestURL += requestURL.includes('?') ? '&' : '?';
    const headers = DEFAULT_HEADERS;
    if (parameters.upload) {
        delete headers['Content-Type'];
    } else {
        headers['Content-Type'] = 'application/json';
    }

    return new Promise((resolve, reject) => {
        fetch(requestURL, {
            method: parameters.method || 'GET',
            body: parameters.body || null,
            headers: {...headers, ...parameters.headers}
        }).then(resp => {
            if (resp.ok) {
                return resp.json().then(responseData => {
                    if (responseData.errors) {
                        reject(new Error(responseData.errors[0]));
                    }

                    const {error, message} = responseData;

                    if (error === Event.ERROR_PERMISSION_DENIED) {
                        window.location = '/login';
                        return;
                    }

                    if (throwError && error !== 0) {
                        Alert.error(message);
                        Event.bus.trigger(Event.RESPONSE_ERROR, responseData);
                    }

                    // Res(Response.underlineToCamelCase(responseData)); ???
                    resolve(responseData);
                });
            }

            reject(new Error('Could not complete your request'));
        });
    });
};

export const getParameterSeparator = url => {
    return url.includes('?') ? '&' : '?';
};
