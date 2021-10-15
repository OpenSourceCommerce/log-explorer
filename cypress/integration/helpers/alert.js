class AlertHelper {
    hasToastMessage(message) {
        cy.waitFor('#toast-container')
        cy.get('#toast-container').should('contain.text', message);
    }
    confirmDialog() {
        cy.get('button').contains('OK').click();
    }
    confirmWindowDialog() {
        cy.on('window:confirm', () => true);
    }

    hasAlert(message) {
        cy.get('div.alert-message').should('have.text', message);
    }
}

export default AlertHelper;
