class AlertHelper {
    hasMessage(message) {
        cy.waitFor('#toast-container')
        cy.get('#toast-container').should('contain.text', message);
    }
}

export default AlertHelper;
