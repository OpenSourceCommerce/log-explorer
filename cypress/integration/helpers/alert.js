class AlertHelper {
    hasMessage(message) {
        cy.waitFor('#toast-container')
        cy.get('#toast-container').should('contain.text', message);
    }
    confirmDialog() {
        cy.get('button').contains('OK').click();
    }
    confirmWindowDialog() {
        cy.on('window:confirm', () => true);
    }
}

export default AlertHelper;
