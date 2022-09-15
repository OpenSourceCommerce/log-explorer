import React, { useState } from "react";
import { AlertMessage, Button, Colors, FormField, Modal, Size, Spinner } from ".";
import { DashboardActions } from "../actions";

export const CreateNewDashboardModal = ({ isShow, onHidden }) => {
    const [dashboardName, setDashboardName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateDashboardSuccess, setIsCreateDashboardSuccess] = useState(false);

    const onCreateDashboardClick = async () => {
        setIsLoading(true);

        const response = await DashboardActions.createOrUpdate(null, {
            title: dashboardName,
        });

        if (response && !response.error) {
            const { id } = response;
            const resLoad = await DashboardActions.loadDashboard(id);
            if (resLoad && !resLoad.error) {
                await setIsCreateDashboardSuccess(true);
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
            <>
                {!isCreateDashboardSuccess ? (
                    <div className="mx-5">
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
                ) : (
                    <div
                        className="d-flex flex-column justify-content-center h-100 w-100"
                        style={{ minHeight: "150px" }}
                    >
                        <span className="text-center mb-4">Creating your awesome dashboard...</span>
                        <Spinner isFullHeight={false} />
                    </div>
                )}
            </>
        </Modal>
    );
};
