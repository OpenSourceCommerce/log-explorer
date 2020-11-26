import {emit, subscribe} from '@nextcloud/event-bus';

const REFRESH_EVENT = 'refresh';

const Live = {
    timer: 0,
    start(timeout = 3000, immediately = false) {
        if (this.timer > 0) {
            return;
        }

        this.timer = setInterval(() => {
            emit(REFRESH_EVENT);
        }, timeout);
        if (immediately) {
            emit(REFRESH_EVENT);
        }
    },
    pause() {
        clearInterval(this.timer);
        this.timer = 0;
    },
    refresh() {
        emit(REFRESH_EVENT);
    },
    onRefresh(cb) {
        subscribe(REFRESH_EVENT, cb);
    }
};

export default Live;
