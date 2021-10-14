/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";
import CookieHelper from "../helpers/cookie";

describe('Dashboard view page', () => {
    const dashboardPage = new DashboardPage();
    const cookieHelper = new CookieHelper();

    beforeEach(() => {
        cy.clearCookies();
        cookieHelper.setCookieDismiss();
        if (cookieHelper.hasSessionId()) {
            cookieHelper.restoreSessionId();
            cy.visit('/dashboard');
        } else {
            cy.loginAsAdmin();
            dashboardPage.visible();
        }
        dashboardPage.visible();
    })

    context('Filter', () => {
        it('Show data', () => {
            dashboardPage.seeDashboard('Status OK');
        })
        it('Filter', () => {
            dashboardPage.dateRange('This Month')
            dashboardPage.search();

            dashboardPage.dateRange('Last Month')
            dashboardPage.search();
        })
    });
})
