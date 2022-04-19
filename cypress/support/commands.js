// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email, {timeout: 20000, force: true}).should('have.value', email);
    cy.get('input[name=password]').type(password, {timeout: 20000, force: true}).should('have.value', password);
    cy.get('button[type=submit]').click({timeout: 30000, force: true});

})

Cypress.Commands.add('loginAsUser', () => {
    cy.login('user001@test.com', '123456')
})

Cypress.Commands.add('loginAsAdmin', () => {
    cy.login('admin1@test.com', '123456')
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
