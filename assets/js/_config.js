export const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export const request = (requestURL, parameters = {}) => {
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
