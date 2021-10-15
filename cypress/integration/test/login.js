/// <reference types="cypress" />
import DashboardPage from "../pages/dashboard_page";
import LoginPage from '../pages/login_page';
import AlertHelper from "../helpers/alert";

const users = require('../../fixtures/login.json');

describe('Login', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const alertHelper = new AlertHelper();

    before(() => {
        cy.clearCookies()
    })

    beforeEach(function () {
        cy.visit('/login');
    })

    users.forEach((user) => {
        const {title, email, password, success, message} = user;
        context(title, () => {
            it(title, () => {
                loginPage.loginUser(email, password)
                if (success) {
                    dashboardPage.visible();
                } else if (message){
                    alertHelper.hasAlert(message);
                }
            })
        })
    })
})
