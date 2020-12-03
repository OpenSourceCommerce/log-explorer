import {Event} from '.';

const Live = {
    timer: 0,
    start(timeout = 3000, immediately = false) {
        if (this.timer > 0) {
            return;
        }

        this.timer = setInterval(() => {
            Event.bus.trigger(Event.REFRESH);
        }, timeout);
        if (immediately) {
            Event.bus.trigger(Event.REFRESH);
        }
    },
    pause() {
        clearInterval(this.timer);
        this.timer = 0;
    },
    refresh() {
        Event.bus.trigger(Event.REFRESH);
    },
    onRefresh(cb) {
        Event.bus.register(Event.REFRESH, cb);
    }
};

export default Live;
