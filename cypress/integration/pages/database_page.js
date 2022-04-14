class DatabasePage {
    selectTable(name) {
        cy.intercept('GET', '/api/table/*/columns').as('loadColumns');
        cy.get('select')
            .first()
            .select(name)
        cy.waitFor('@loadColumns')
        cy.get('button').contains('Update').should('be.enabled');
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
    clickLogViewSetting() {
        cy.get('button').contains('Log view setting').click();
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

    visible() {
        cy.url().should('include', '/table');
        cy.intercept('GET', '/api/table').as('loadTable');
        cy.waitFor('@loadTable')
        cy.get('h3').contains('Table view').should('be.visible');
    }
}

export default DatabasePage;
