/// <reference types="cypress" />
import LogViewPage from "../pages/logview_page";
import DashboardPage from "../pages/dashboard_page";

describe('Log view page', () => {
    const dashboardPage = new DashboardPage();
    const logViewPage = new LogViewPage();

    before(() => {
        cy.clearCookies()
    })

    beforeEach(function () {
        cy.loginAsAdmin();
        dashboardPage.visible();
        cy.visit('/log-view');
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
