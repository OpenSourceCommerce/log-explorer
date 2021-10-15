/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";
import AlertHelper from "../helpers/alert";
import DatabasePage from "../pages/database_page";
import TablePage from "../pages/table_page";
import LogViewSettingPage from "../pages/logview_setting_page";
import {random} from "lodash/number";
import CookieHelper from "../helpers/cookie";

const tableName = 'test_' + random(100000, 999999);

describe('Database page', () => {
    const dashboardPage = new DashboardPage();
    const databasePage = new DatabasePage();
    const tablePage = new TablePage();
    const logViewSettingPage = new LogViewSettingPage();
    const alertHelper = new AlertHelper();
    const cookieHelper = new CookieHelper();

    beforeEach(() => {
        cy.clearCookies();
        cookieHelper.setCookieDismiss();
        if (cookieHelper.hasSessionId()) {
            cookieHelper.restoreSessionId();
            cy.visit('/table');
        } else {
            cy.loginAsAdmin();
            dashboardPage.visible();
            databasePage.open();
        }
        databasePage.visible();
    })

    context('Database view', () => {
        it('Select table', () => {
            databasePage.selectTable('nginx_access');
            databasePage.tableLoaded();
        })
    });
    context('Table test', () => {
        it('create table', () => {
            databasePage.clickCreateTable();
            tablePage.fillTableName(tableName);
            tablePage.fillTableTTL('timestamp + toIntervalMonth(100)');
            tablePage.setColumn(0, "status", "Int8");
            tablePage.setColumn(1, "url", "String");
            tablePage.setColumn(2, "delete_me", "String");
            tablePage.clickCreate();
            tablePage.isUpdatePage(tableName);
        })
        it('update table', () => {
            databasePage.selectTable(tableName);
            databasePage.clickUpdate();
            tablePage.isUpdatePage(tableName);
            tablePage.addMoreField();

            tablePage.setColumn(5, "add_more", "String");
            tablePage.setColumn(1, "url_edit", "String");
            tablePage.deleteColumn(2);
            alertHelper.confirmDialog();
            alertHelper.hasToastMessage('Remove successful');
            tablePage.clickUpdate();
            alertHelper.confirmWindowDialog();
            alertHelper.hasToastMessage('Update successful');
        })
        it('delete table', () => {
            databasePage.selectTable(tableName);
            databasePage.clickDelete();
            alertHelper.confirmDialog();
            alertHelper.hasToastMessage('Remove successful');
        })
    });
    context('Table log view setting', () => {
        it('Update setting', () => {
            databasePage.selectTable('nginx_access');
            databasePage.clickLogViewSetting();
            logViewSettingPage.tableLoaded('nginx_access');
            logViewSettingPage.fillGraphTitle('Nginx access ' + random(1000, 9999));
            logViewSettingPage.setGraphPoint(random(6, 12));
            logViewSettingPage.addLine('Status OK', '#ff00ff', 'status = 200')
            logViewSettingPage.addLine('Status Error', '#ff0000', 'status >= 500')
            logViewSettingPage.clickSave()
            alertHelper.hasToastMessage('Update successful');
            logViewSettingPage.deleteLine(2);
            logViewSettingPage.deleteLine(1);
            logViewSettingPage.clickSave()
            alertHelper.hasToastMessage('Update successful');
        })
    });
})
