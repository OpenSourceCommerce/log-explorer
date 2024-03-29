/// <reference types="cypress" />
import LogViewPage from "../pages/logview_page";
import DashboardPage from "../pages/dashboard_page";
import CookieHelper from "../helpers/cookie";

describe('Log view page', () => {
    const dashboardPage = new DashboardPage();
    const logViewPage = new LogViewPage();
    const cookieHelper = new CookieHelper();

    beforeEach(() => {
        cy.clearCookies();
        cookieHelper.setCookieDismiss();
        if (cookieHelper.hasSessionId()) {
            cookieHelper.restoreSessionId();
            cy.visit('/log-view');
        } else {
            cy.loginAsAdmin();
            dashboardPage.visible();
            logViewPage.open();
        }
        logViewPage.visible();
    })

    context('Filter', () => {
        it('Filter', () => {
            logViewPage.dateRange('This Month');
            logViewPage.filter('status < 300');
            logViewPage.search();

            logViewPage.dateRange('Last Month');
            logViewPage.search();
        })
        it('Save/delete filter', () => {
            logViewPage.dateRange('This Month');
            logViewPage.filter('status < 300');
            logViewPage.search();

            logViewPage.saveFilter('Status OK');
            logViewPage.deleteFilter('Status OK');
        })
    });
})
