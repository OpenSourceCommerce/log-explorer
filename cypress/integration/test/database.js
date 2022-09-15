/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";
import AlertHelper from "../helpers/alert";
import DatabasePage from "../pages/database_page";
import TablePage from "../pages/table_page";
import LogViewSettingPage from "../pages/logview_setting_page";
import { random } from "lodash/number";
import CookieHelper from "../helpers/cookie";
import ModalConfirmHelper from "../helpers/modal_confirm";

const tableName = "test_" + random(100000, 999999);

describe("Database page", () => {
    const dashboardPage = new DashboardPage();
    const databasePage = new DatabasePage(tableName);
    const logViewSettingPage = new LogViewSettingPage();
    const cookieHelper = new CookieHelper();

    beforeEach(() => {
        cy.clearCookies();
        cookieHelper.setCookieDismiss();
        if (cookieHelper.hasSessionId()) {
            cookieHelper.restoreSessionId();
            cy.visit("/table");
        } else {
            cy.loginAsAdmin();
            dashboardPage.visible();
            databasePage.open();
        }
        databasePage.visible();
    });

    context("Database view", () => {
        it("Select table", () => {
            databasePage.tableLoaded("nginx_access");
        });
    });
    context("Table test", () => {
        it("create table", () => {
            databasePage.clickCreateTable();
            const tablePage = new TablePage(tableName, true);
            tablePage.fillTableName();
            tablePage.fillTableTTL("timestamp + toIntervalMonth(100)");
            tablePage.addMoreColumn();
            tablePage.addMoreColumn();
            tablePage.setColumn(0, "status", "Int8");
            tablePage.setColumn(1, "url", "String");
            tablePage.setColumn(2, "delete_me", "String");
            tablePage.clickCreate();
            tablePage.isCreateDatatableSuccess();
        });
        it("update table", () => {
            databasePage.selectTable(tableName);
            const tablePage = new TablePage(tableName);
            cy.wait(3000);
            tablePage.addMoreColumn();
            tablePage.setColumn(5, "add_more", "String");
            tablePage.setColumn(1, "url_edit", "String");
            tablePage.deleteColumn(3);
            cy.wait(2000);
            const confirmDeleteModal = new ModalConfirmHelper(
                "#remove-column-delete_me",
                "Be careful - this will also delete the column in clickhouse table!"
            );
            confirmDeleteModal.isBodyMessageExist();
            confirmDeleteModal.onClickConfirmAction();
            tablePage.isColumnNotExistAfterRemove("delete_me");
        });
        it("delete table", () => {
            databasePage.selectTable(tableName);
            databasePage.clickDelete();
            const confirmDeleteModal = new ModalConfirmHelper(
                "#delete-table",
                "Be careful - this will also delete the table in clickhouse database!"
            );

            confirmDeleteModal.isBodyMessageExist();
            confirmDeleteModal.onClickConfirmAction();
            databasePage.isTableNotExist();
            // alertHelper.confirmDialog();
            // alertHelper.hasToastMessage('Remove successful');
        });
    });
    // context('Table log view setting', () => {
    //     it('Update setting', () => {
    //         databasePage.selectTable('nginx_access');
    //         databasePage.clickLogViewSetting();
    //         logViewSettingPage.tableLoaded('nginx_access');
    //         logViewSettingPage.fillGraphTitle('Nginx access ' + random(1000, 9999));
    //         logViewSettingPage.setGraphPoint(random(6, 12));
    //         logViewSettingPage.addLine('Status OK', '#ff00ff', 'status = 200')
    //         logViewSettingPage.addLine('Status Error', '#ff0000', 'status >= 500')
    //         logViewSettingPage.clickSave()
    //         alertHelper.hasToastMessage('Update successful');
    //         logViewSettingPage.deleteLine(2);
    //         logViewSettingPage.deleteLine(1);
    //         logViewSettingPage.clickSave()
    //         alertHelper.hasToastMessage('Update successful');
    //     })
    // });
});
