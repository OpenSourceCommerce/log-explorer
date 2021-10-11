/// <reference types="cypress" />
const users = require('../../fixtures/login.json');
import LoginPage from '../pages/login_page';

describe('Login', () => {
    const loginPage = new LoginPage();
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
                    cy.location().should((location) => {
                        expect(location.pathname, '/dashboard/**')
                    });
                } else if (message){
                    cy.get('div.alert-message')
                        .should('have.text', message);
                }
            })
        })
    })
})
