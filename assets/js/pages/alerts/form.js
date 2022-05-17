import React, { Component } from "react";
import { AlertForm, Modal, Size } from "../../components";

export class AlertFormModal extends Component {
    render() {
        let { isShow, editAlertIndex, alertList, onHidden, ...props } = this.props;

        const alertId = alertList[editAlertIndex]?.id;

        const alertElement = alertList[editAlertIndex];

        return (
            <Modal
                id={`alert-form-${alertId || "create"}`}
                size={Size.medium}
                title={`${alertId ? "Update" : "Create new"} alert`}
                showCloseButton={false}
                show={isShow}
                isPositionCenter={true}
                onHidden={onHidden}
            >
                <AlertForm
                    key={alertId}
                    alertId={alertId}
                    alertElement={alertElement}
                    {...props}
                />
            </Modal>
        );
    }
}
