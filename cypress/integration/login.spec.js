/// <reference types="cypress" />

context('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost/login')
    })
    // https://on.cypress.io/wait
    it('Login with fake account', () => {
        cy.get('input[name=email]').type('test-no-user@test.com');
        cy.get('input[name=password]').type('Qwewsdsfsf32312312');
        cy.get('button[type=submit]').click()
            .next()
            .should('have.text', '');
    })
})
