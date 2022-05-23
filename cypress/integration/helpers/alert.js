class AlertHelper {
    findToastMessageByClassName(message) {
        this.findToastMessage('.toast-container', message)
    }
    hasToastMessage(message) {
        this.findToastMessage('#toast-container', message)
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
    findToastMessage(name, message) {
        cy.waitFor(name);
        cy.get(name).should('contain.text', message);
    }
}

export default AlertHelper;
