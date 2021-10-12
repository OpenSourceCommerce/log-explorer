class DatabasePage {
    selectTable(name) {
        cy.get('select')
            .first()
            .select(name)
    }
    tableLoaded() {
        cy.get('#root')
            .find('table')
            .first()
            .find('tbody')
            .should('contain', '_id');
    }
    clickUpdate() {
        cy.get('button').contains('Update').click();
    }
    clickCreateTable() {
        cy.get('a').contains('Create table').click();
    }
    clickDelete() {
        cy.get('button').contains('Delete').click();
    }
    open() {
        cy.get('a.nav-link').contains('Database').click({force: true});
    }
}

export default DatabasePage;
