import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Size, Colors} from '.';
import 'bootstrap/js/dist/modal';

export class Modal extends Component {
    render() {
        let {
            title,
            children,
            className = '',
            id,
            size = Size.large,
            showCloseButton = true,
            closeButtonTitle = 'Close',
            closeButtonAction,
            showSaveButton,
            saveButtonAction,
            saveButtonTitle = 'Save Changes',
            saveButtonColor = Colors.blue,
            onShow,
            onShown,
            onHide,
            onHidden,
            show = false
        } = this.props;

        className += ' modal fade';
        const element = $(`#${id}`);

        if (show) {
            element.modal('show');
        } else {
            element.modal('hide');
        }

        if (onShow && typeof onShow === 'function') {
            element.on('show.bs.modal', onShow);
        }

        if (onShown && typeof onShown === 'function') {
            element.on('shown.bs.modal', onShown);
        }

        if (onHide && typeof onHide === 'function') {
            element.on('hide.bs.modal', onHide);
        }

        if (onHidden && typeof onHidden === 'function') {
            element.on('hidden.bs.modal', onHidden);
        }

        return (
            <div className={className} id={id}>
                <div className={`modal-dialog modal-${size}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <Button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </Button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer justify-content-between">
                            {showCloseButton && <Button type="button" className="btn btn-default" onClick={closeButtonAction}
                                data-dismiss="modal">{closeButtonTitle}
                            </Button>}
                            {showSaveButton && saveButtonAction && <Button type="button" onClick={saveButtonAction}
                                color={saveButtonColor}>{saveButtonTitle}</Button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string.isRequired,
    size: PropTypes.string,
    show: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    showSaveButton: PropTypes.bool,
    closeButtonTitle: PropTypes.string,
    closeButtonAction: PropTypes.func,
    saveButtonAction: PropTypes.func,
    saveButtonTitle: PropTypes.string,
    saveButtonColor: PropTypes.string,
    className: PropTypes.string,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    children: PropTypes.any
};
