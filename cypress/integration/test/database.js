/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";
import AlertHelper from "../helpers/alert";
import DatabasePage from "../pages/database_page";
import TablePage from "../pages/table_page";
import LogViewSettingPage from "../pages/logview_setting_page";
import {random} from "lodash/number";

const tableName = 'test_' + random(100000, 999999);

describe('Database page', () => {
    const dashboardPage = new DashboardPage();
    const databasePage = new DatabasePage();
    const tablePage = new TablePage();
    const logViewSettingPage = new LogViewSettingPage();
    const alertHelper = new AlertHelper();

    before(() => {
        cy.clearCookies()
    })

    beforeEach(function () {
        cy.loginAsAdmin();
        dashboardPage.visible();
        databasePage.open();
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
            alertHelper.hasMessage('Remove successful');
            tablePage.clickUpdate();
            alertHelper.confirmWindowDialog();
            alertHelper.hasMessage('Update successful');
        })
        it('delete table', () => {
            databasePage.selectTable(tableName);
            databasePage.clickDelete();
            alertHelper.confirmDialog();
            alertHelper.hasMessage('Remove successful');
        })
    });
    context('Table log view setting', () => {
        it('Update setting', () => {
            databasePage.selectTable('nginx_access');
            databasePage.clickLogViewSetting();
            logViewSettingPage.tableLoaded('nginx_access');
        })
    });
})
