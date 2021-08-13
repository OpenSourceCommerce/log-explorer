/// <reference types="cypress" />

context('Login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })
    // https://on.cypress.io/wait
    it('Login with fake account', () => {
        cy.get('input[name=email]').type('test-no-user@test.com');
        cy.get('input[name=password]').type('Qwewsdsfsf32312312');
        cy.get('button[type=submit]').click()
        cy.get('div.alert-message')
            .should('have.text', 'Invalid credentials.');
    })
    it('Login with valid account', () => {
        let myConfig = Cypress.config()
        cy.get('input[name=email]').type('admin1@test.com');
        cy.get('input[name=password]').type('123456');
        cy.get('button[type=submit]').click()
        cy.url()
            .should('contain', myConfig.baseUrl + '/log-view-a');
    })
})
