import toastr from 'admin-lte/plugins/toastr/toastr.min';
import('admin-lte/plugins/toastr/toastr.css');

const Alert = {
    error(message, options = {}) {
        this.showFlashMessage('warning', message, options);
    },
    success(message, options = {}) {
        this.showFlashMessage('success', message, options);
    },
    showFlashMessage(type, message, options = {}) {
        let defaultOptions = {
            closeButton: true,
            progressBar: false,
            newestOnTop: false,
            rtl: $('body').attr('dir') === 'rtl' || $('html').attr('dir') === 'rtl',
            timeOut: 10000,
            extendedTimeOut: 0,
            positionClass: 'toast-bottom-right'
        };
        const title = options.title === undefined ? null : options.title;
        defaultOptions = Object.assign(defaultOptions, options);
        toastr[type](message, title, defaultOptions);
    },
    confirm(message, onConfirmed) {
        if (confirm(message)) {
            onConfirmed();
        }
    }
};

export default Alert;
