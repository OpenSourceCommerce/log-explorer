class LogViewSettingPage {
    tableLoaded(name) {
        cy.get('#root')
            .find('form').first()
            .find('a').first()
            .should('have.text', name);
    }
}

export default LogViewSettingPage;
