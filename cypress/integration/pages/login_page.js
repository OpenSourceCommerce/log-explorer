class LoginPage {
    loginUser(userEmail, userPassword) {
        cy.get('input[name=email]').type(userEmail, {timeout: 20000, force: true}).should('have.value', userEmail);
        cy.get('input[name=password]').type(userPassword, {timeout: 20000, force: true}).should('have.value', userPassword);
        cy.get('button[type=submit]').click({timeout: 30000, force: true});
    }
}

export default LoginPage;
