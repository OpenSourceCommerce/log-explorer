import React, { useEffect, useState } from "react";
import { Modal, Size, WidgetManagement } from "../../components";

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
        >
            {widget && <WidgetManagement widgetDetail={widget} {...props} />}
        </Modal>
    );
};
