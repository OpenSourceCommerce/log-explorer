/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";

describe('Dashboard view page', () => {
    const dashboardPage = new DashboardPage();

    before(() => {
        cy.clearCookies()
    })

    beforeEach(function () {
        cy.loginAsAdmin();
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
