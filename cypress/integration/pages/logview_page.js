class LogViewPage {
    dateRange(label) {
        cy.get('#date-range').click();
        cy.contains(label).click();
    }
    filter(query) {
        cy.get('#filter-text').type(query, {timeout: 20000, force: true});
    }
    search() {
        cy.get('#btn-search').click();
    }
    saveFilter(name) {
        cy.get('#btn-filter-save').click();
        cy.get('input[name=name]').should('be.visible');
        cy.get('input[name=name]').type(name);
        cy.get('#query').contains('Save').click();
        cy.get('#query').should('not.be.visible');
    }
    deleteFilter(name) {
        cy.get('#btn-filter-saved').click();
        cy.get('#btn-filter-saved').closest('div')
            .find('.dropdown-item').contains(name)
            .closest('div')
            .find('a.btn-filter-remove').first()
            .click();
    }

    open() {
        cy.get('a.nav-item').contains('Explore').click({force: true});
    }

    visible() {
        cy.url().should('include', '/log-view');
    }
}

export default LogViewPage;
