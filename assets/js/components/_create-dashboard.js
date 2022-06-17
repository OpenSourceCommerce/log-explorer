import React, { useState } from "react";
import { DashboardActions } from "../actions";
import { AlertMessage, Button, FormField, Modal, Size, Colors } from "./index";

export const CreateNewDashboardModal = ({ isShow, onHidden }) => {
    const [dashboardName, setDashboardName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const onCreateDashboardClick = async () => {
        setIsLoading(true);

        const response = await DashboardActions.createOrUpdate(null, {
            title: dashboardName,
        });

        if (response && !response.error) {
            const { id } = response;
            const resLoad = await DashboardActions.loadDashboard(id);
            if (resLoad && !resLoad.error) {
                await setAlertMessage({
                    color: Colors.green,
                    message: "Create new dashboard successful, we will redirect you now",
                });
                setTimeout(() => {
                    window.location.href = `/dashboard/${resLoad.data.uuid}`;
                }, 2000);
            }
        }
    };

    return (
        <Modal
            size={Size.medium}
            id="create-new-dashboard"
            title="Create new dashboard"
            showCloseButton={false}
            showSaveButton={false}
            isPositionCenter={true}
            show={isShow}
            onHidden={onHidden}
        >
            <div className="mx-5">
                <AlertMessage
                    className="mb-3"
                    color={alertMessage?.color}
                    message={alertMessage?.message}
                />
                <FormField
                    value={dashboardName}
                    fieldName="dashboardName"
                    className="mb-3"
                    label="Title"
                    placeholder="Give your dashboard a cool name..."
                    isMandatory={true}
                    disabled={isLoading}
                    onChange={(e) => setDashboardName(e.target?.value)}
                />
                <Button
                    className="w-100"
                    disabled={isLoading || !dashboardName}
                    onClick={() => onCreateDashboardClick()}
                >
                    Create dashboard
                </Button>
            </div>
        </Modal>
    );
};
