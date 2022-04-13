import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Size, Colors} from '.';

export class Modal extends Component {
    componentDidMount = () => {
        const {
            id,
            onShow,
            onShown,
            onHide,
            onHidden,
        } = this.props;
        this.modalEl = document.getElementById(id);
        this.modal = new bootstrap.Modal(this.modalEl);


        if (onShow && typeof onShow === 'function') {
            this.modalEl.addEventListener('show.bs.modal', onShow);
        }

        if (onShown && typeof onShown === 'function') {
            this.modalEl.addEventListener('shown.bs.modal', onShown);
        }

        if (onHide && typeof onHide === 'function') {
            this.modalEl.addEventListener('hide.bs.modal', onHide);
        }

        if (onHidden && typeof onHidden === 'function') {
            this.modalEl.addEventListener('hidden.bs.modal', onHidden);
        }
    }

    render() {
        const {
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
            show = false
        } = this.props;

        if(this.modal) {
            if (show) {
                //element.modal('show');
                this.modal.show();
            } else {
                this.modal.hide();
            }
        }

        return (
            <div className={`modal fade ${className}`} id={id}>
                <div className={`modal-dialog modal-${size}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <Button type="button" className="close" data-dismiss="modal" onClick={closeButtonAction}
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
