class ProfilePage {
    clearInputs() {
        cy.get('input[name=firstName]').clear();
        cy.get('input[name=lastName]').clear();
    }
    setFirstname(firstName) {
        cy.get('input[name=firstName]').type(firstName);
    }
    setLastname(lastName) {
        cy.get('input[name=lastName]').type(lastName);
    }
    hasFirstnameError() {
        cy.get('input[name=firstName]').should('have.class', 'is-invalid');
    }
    hasLastnameError() {
        cy.get('input[name=lastName]').should('have.class', 'is-invalid');
    }
    open() {
        cy.get('a.nav-link').contains('Profile').click({force: true});
    }
    save() {
        cy.get('#root').find('button').contains('Update').click();
    }
}

export default ProfilePage;
