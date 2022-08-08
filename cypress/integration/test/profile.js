/// <reference types="cypress" />
import ProfilePage from "../pages/profile_page";
import AlertHelper from "../helpers/alert";
import CookieHelper from "../helpers/cookie";
import DashboardPage from "../pages/dashboard_page";

const randomText = (length = 8) => {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

describe('Profile page', () => {
    const dashboardPage = new DashboardPage();
    const profilePage = new ProfilePage();
    const alertHelper = new AlertHelper();
    const cookieHelper = new CookieHelper();

    beforeEach(() => {
        cy.clearCookies();
        cookieHelper.setCookieDismiss();
        if (cookieHelper.hasSessionId()) {
            cookieHelper.restoreSessionId();
        } else {
            cy.loginAsUser();
            dashboardPage.visible();
        }
        profilePage.open();
    })

    context('Update profile', () => {
        it('Save empty field', () => {
            profilePage.clearInputs();
            profilePage.setFirstname(randomText());
            profilePage.isDisableSave();

            profilePage.clearInputs();
            profilePage.setLastname(randomText());
            profilePage.isDisableSave();
        })
        it('Save success', () => {
            profilePage.clearInputs();
            cy.wait(1000);
            profilePage.setFirstname(randomText());
            profilePage.setLastname(randomText());
            profilePage.save();
            alertHelper.findToastMessageByClassName('Update profile successful');
        })
    });
})
