import React, { useState, useEffect } from "react";
import { Button, Colors, Icon, Link, Modal, Size, Text, WidgetList } from ".";

export const WidgetListModal = ({ isShow, onHidden, ...props }) => {
    const headerChildren = (
        <Link href="/setting?tab=widgets" className="text-decoration-none">
            <Icon dataFeather="settings" className="feather-sm stroke-width-3 me-2" />
            <Text className="fw-bold d-inline-block align-middle">Edit Widget</Text>
        </Link>
    );
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
            headerChildren={headerChildren}
        >
            {isShow && <WidgetList {...props} />}
        </Modal>
    );
};
