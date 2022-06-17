import React, { useState, useEffect } from "react";
import { Modal, Size, WidgetList } from ".";

export const WidgetListModal = ({ isShow, onHidden, ...props }) => {
    return (
        <Modal
            className="widget-list-modal"
            id="widget-list-modal"
            size={Size.extraLarge}
            title="Add Widget"
            showCloseButton={false}
            isPositionCenter={true}
            show={isShow}
            onHidden={onHidden}
        >
            <WidgetList
                onSelectWidgetForDashboard={(item) => {
                    console.log(item);
                }}
                {...props}
            />
        </Modal>
    );
};
