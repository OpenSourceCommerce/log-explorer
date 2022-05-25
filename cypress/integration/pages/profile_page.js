class ProfilePage {
    clearInputs() {
        cy.get('[data-cy=firstName]')
            .should('be.visible')
            .click()
            .type('{selectall}{backspace}{selectall}{backspace}')
            .should('have.value', '');

        cy.get('[data-cy=lastName]')
            .should('be.visible')
            .click()
            .type('{selectall}{backspace}{selectall}{backspace}')
            .should('have.value', '')
    }
    setFirstname(firstName) {
        cy.get('[data-cy=firstName]').type(firstName).blur();
    }
    setLastname(lastName) {
        cy.get('[data-cy=lastName]').type(lastName).blur();
    }
    hasFirstnameError() {
        cy.get('[data-cy=firstName]').should('have.class', 'is-invalid');
    }
    hasLastnameError() {
        cy.get('[data-cy=lastName]').should('have.class', 'is-invalid');
    }
    open() {
        cy.intercept('GET', '/api/profile').as('myProfile');
        cy.visit('/profile')
        cy.url().should('include', '/profile');
        cy.waitFor('@myProfile')
        cy.get('[data-cy=btnSave]')
            .should('be.disabled');
        // cy.wait('@myProfile').its('response.statusCode').should('equal', 200)
    }
    save() {
        cy.get('[data-cy=btnSave]')
            .should('be.visible')
            .should('be.enabled')
            .click();
    }

    isDisableSave() {
        cy.get('[data-cy=btnSave]')
            .should('be.disabled');
    }
}

export default ProfilePage;
