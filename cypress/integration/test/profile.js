/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";
import ProfilePage from "../pages/profile_page";
import AlertHelper from "../helpers/alert";
import CookieHelper from "../helpers/cookie";

describe('Dashboard view page', () => {
    const dashboardPage = new DashboardPage();
    const profilePage = new ProfilePage();
    const alertHelper = new AlertHelper();
    const cookieHelper = new CookieHelper();

    beforeEach(() => {
        cy.clearCookies();
        cookieHelper.setCookieDismiss();
        if (cookieHelper.hasSessionId()) {
            cookieHelper.restoreSessionId();
            cy.visit('/profile');
        } else {
            cy.loginAsUser();
            dashboardPage.visible();
            profilePage.open();
        }
        profilePage.visible();
    })

    context('Update profile', () => {
        it('Save empty field', () => {
            profilePage.clearInputs();
            profilePage.setFirstname('Test');
            profilePage.save();
            profilePage.hasLastnameError();

            profilePage.clearInputs();
            profilePage.setLastname('Test');
            profilePage.save();
            profilePage.hasFirstnameError();
        })
        it('Save success', () => {
            profilePage.clearInputs();
            profilePage.setFirstname('Test');
            profilePage.setLastname('No1');
            profilePage.save();
            alertHelper.hasToastMessage('Update successful');
        })
    });
})
