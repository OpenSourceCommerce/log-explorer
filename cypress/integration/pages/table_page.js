class TablePage {
    addMoreField() {
        cy.get('button')
            .contains('Add more column')
            .click()
        cy.get('.table_field')
            .last()
            .should('have.value', '');
    }
    tableLoaded() {
        cy.get('#root')
            .find('table')
            .first()
            .find('tbody')
            .should('contain', '_id');
    }
    clickUpdate() {
        cy.get('button').contains('Update').click({force: true});
    }
    fillTableName(name) {
        cy.get('input[name=table_name]')
            .clear()
            .type(name);
    }
    fillTableTTL(val) {
        cy.get('input[name=table_ttl]')
            .clear()
            .type(val);
    }
    setColumn(index, name, type) {
        cy.get('.table_field')
            .eq(index)
            .clear()
            .type(name);
        cy.get('.table_type')
            .eq(index)
            .select(type);
    }
    deleteColumn(index) {
        cy.get('.table_rm_column')
            .eq(index)
            .click();
    }
    clickCreate() {
        cy.get('button').contains('Create table').click();
    }
    isUpdatePage(table) {
        cy.url().should('include', '/table/' + table);
        cy.waitFor('#btn-more-column')
        cy.get('.table_field')
            .should('have.length.gte', 1);

    }
}

export default TablePage;
