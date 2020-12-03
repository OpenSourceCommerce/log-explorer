import {emit, subscribe} from '@nextcloud/event-bus';

const Event = {
    ERROR_INVALID_QUERY: 2,
    REFRESH: 'refresh',
    RESPONSE_ERROR: 'response_error',
    bus: {
        trigger(name, parameters) {
            emit(name, parameters);
        },
        register(name, callback) {
            subscribe(name, callback);
        }
    }
};
export default Event;
