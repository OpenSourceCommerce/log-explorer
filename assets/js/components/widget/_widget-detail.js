import React from "react";
import { Modal, Size, WidgetManagement } from "..";

export const WidgetDetailModal = ({ widget, isShow, onHidden, ...props }) => {
    return (
        <Modal
            className="modal-widget-detail"
            id={`modal-detail`}
            size={Size.extraLarge}
            title={`${widget?.id ? "Update" : "Add"} Widget`}
            showCloseButton={false}
            show={isShow}
            isPositionCenter={true}
            onHidden={onHidden}
            style={{zIndex: "1060"}}
        >
            {widget && <WidgetManagement widgetDetail={widget} isShow={isShow} {...props} />}
        </Modal>
    );
};
