class ProfilePage {
    clearInputs() {
        cy.get('[data-cy=firstName]')
            .should('be.visible')
            .clear()
            .should('have.value', '')
        cy.get('[data-cy=lastName]')
            .should('be.visible')
            .clear()
            .should('have.value', '')
    }
    setFirstname(firstName) {
        cy.get('[data-cy=firstName]').type(firstName);
    }
    setLastname(lastName) {
        cy.get('[data-cy=lastName]').type(lastName);
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
            .should('be.enabled');
        // cy.wait('@myProfile').its('response.statusCode').should('equal', 200)
    }
    save() {
        cy.get('[data-cy=btnSave]')
            .should('be.visible')
            .should('be.enabled')
            .click();
    }

    visible() {
        // cy.get('[data-cy=btnSave]')
        //     .should('be.enabled');
    }
}

export default ProfilePage;
