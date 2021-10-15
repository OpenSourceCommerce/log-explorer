class LogViewSettingPage {
    tableLoaded(name) {
        cy.get('#root')
            .find('form').first()
            .find('a').first()
            .should('have.text', name);
    }
    fillGraphTitle(title) {
        cy.get('input[name=graph_title]')
            .clear()
            .type(title)
    }
    setGraphPoint(num) {
        cy.get('input[name=graph_point]')
            .clear()
            .type(num)
    }
    addLine(name, color, filter) {
        cy.get('button').contains('Add more line').click()
        cy.get('.line_name').last()
            .clear()
            .type(name)
        cy.get('.line_color').last()
            .clear()
            .type(color)
        cy.get('.line_filter').last()
            .clear()
            .type(filter);
    }
    clickSave() {
        cy.get('button').contains('Update graph').click()
    }
    deleteLine(num) {
        cy.get('.line_delete')
            .eq(num)
            .click();
    }
}

export default LogViewSettingPage;
