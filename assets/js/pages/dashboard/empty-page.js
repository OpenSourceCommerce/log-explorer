import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DashboardActions } from "../../actions";
import {
    Button,
    Icon,
    ContentHeader,
    Image,
    Colors,
    Modal,
    Size,
    FormField,
    Toast,
    AlertMessage,
} from "../../components";
import NoDashboardImage from "../../../images/no-dashboard.png";
import "../../../styles/pages/dashboard-empty.scss";

const EmptyDashboardComponent = ({ onCreateNewDashboardClick }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="no-dashboard-content position-absolute">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        className="no-dashboard-image"
                        src={NoDashboardImage}
                        alt="No dashboard image"
                    />
                    <span className="title fs-4 fw-bold mt-2">You don't have a dashboard yet</span>
                    <span className="sub-title my-3">Let’s create your first dashboard</span>
                    <Button onClick={onCreateNewDashboardClick}>
                        <Icon dataFeather="plus" className="feather-lg stroke-width-4" />
                        <span className="fw-bold align-middle ms-2">
                            Create your first dashboard
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CreateNewDashboardModal = ({ isShow, onHidden }) => {
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
                    message: "Create dashboard success, we will redirect your in few second",
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

const DashBoardEmptyPage = ({}) => {
    const [isDisplayCreateNewDashboardModal, setIsDisplayCreateNewDashboardModal] = useState();
    const [toastContent, setToastContent] = useState();

    return (
        <div className="dashboard-page">
            <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
            <ContentHeader className="mt-2" pageTitle="Dashboard" iconName="home"></ContentHeader>
            <EmptyDashboardComponent
                onCreateNewDashboardClick={() => setIsDisplayCreateNewDashboardModal(true)}
            />
            <CreateNewDashboardModal
                isShow={isDisplayCreateNewDashboardModal}
                onHidden={() => setIsDisplayCreateNewDashboardModal(false)}
                onCreateDashboard={() => {}}
            />
        </div>
    );
};

ReactDOM.render(<DashBoardEmptyPage />, document.querySelector("#root"));


// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import {Alert, DashboardActions} from "../../actions";
// import {Button, CardHeader, Icon, Link, Table, DeleteModal, ExportImport} from "../../components";

// class DashboardList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dashboards: [],
//             dashboardSelected: null,
//         };
//     }

//     componentDidMount() {
//         const that = this;
//         DashboardActions.listDashboard()
//             .then(res => {
//                 const {error, data} = res;
//                 if (error) {
//                     return;
//                 }

//                 that.setState({
//                     dashboards: data
//                 });
//             });
//     }

//     deleteDashboard(key) {
//         this.setState({
//             dashboardSelected: key,
//         })
//     }

//     render() {
//         const {dashboards, dashboardSelected} = this.state;

//         return (
//             <div className="database">
//                 <DeleteModal
//                     data={dashboards}
//                     indexSelected={dashboardSelected}
//                     objectName="dashboard"
//                     displayField="title"
//                     closeButtonAction={() => {
//                         this.setState({
//                             dashboardSelected: false,
//                         })
//                     }}
//                     saveButtonAction={() => {
//                         try {
//                             DashboardActions.deleteDashboard(dashboards[dashboardSelected].id)
//                                 .then(res => {
//                                     const {error} = res;
//                                     if (error) {
//                                         Alert.success('You can not delete this dashboard');
//                                         return;
//                                     }

//                                     dashboards.splice(dashboardSelected, 1);
//                                     this.setState({dashboards}, () => {
//                                         Alert.success('Delete successful');
//                                     });
//                                 });
//                         } catch (e) {
//                             Alert.error(e);
//                         } finally {
//                             this.setState({
//                                 dashboardSelected: null,
//                             })
//                         };
//                     }}
//                 />
//                 <div className="card">
//                     <CardHeader title="Dashboard list" showCollapseButton={false} showRemoveButton={false}>
//                         <ExportImport/>
//                         <Link href={'/dashboard/create'} className={'btn btn-success'}>Create dashboard</Link>
//                     </CardHeader>
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-12">
//                                 <Table>
//                                     <thead>
//                                     <tr>
//                                         <th>&nbsp;</th>
//                                         <th>Title</th>
//                                         <th>Last update</th>
//                                         <th>&nbsp;</th>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {dashboards.map((item, key) => {
//                                         const url = '/dashboard/edit/' + item.id;
//                                         return <tr key={key}>
//                                             <td><input type="checkbox" className="export-item" data-id={item.id}/></td>
//                                             <td>{item.title}</td>
//                                             <td>{item.last_updated}</td>
//                                             <td>
//                                                 <Link href={`/dashboard/${item.uuid}`} className="btn btn-primary me-2" ><Icon name={'eye'}/></Link>
//                                                 <Link href={url} className={'btn btn-success me-2'}><Icon name={'edit'}/></Link>
//                                                 <Button onClick={e => this.deleteDashboard(key)} color={'danger'}><Icon name={'trash'}/></Button>
//                                             </td>
//                                         </tr>;
//                                     })}
//                                     </tbody>
//                                 </Table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// ReactDOM.render(<DashboardList/>, document.querySelector('#root'));

