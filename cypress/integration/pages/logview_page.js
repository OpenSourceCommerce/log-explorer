class LogViewPage {
    dateRange(label) {
        cy.get('#date-range').click({force: true});
        cy.contains(label).click({force: true});
    }
    filter(query) {
        cy.get('#filter-text').type(query, {timeout: 20000, force: true});
    }
    search() {
        cy.get('#btn-search').click({force: true});
    }
    saveFilter(name) {
        cy.get('#btn-filter-save').click({force: true});
        cy.get('input[name=name]').should('be.visible');
        cy.get('input[name=name]').type(name);
        cy.get('#query').contains('Save').click();
        cy.get('#query').should('not.be.visible');
    }
    deleteFilter(name) {
        cy.get('#btn-filter-saved').click({force: true});
        cy.get('#btn-filter-saved').closest('div')
            .find('.dropdown-item').contains(name)
            .closest('div')
            .find('a.btn-filter-remove').first()
            .click({force: true});
    }

    open() {
        cy.get('a.nav-link').contains('Explore').click({force: true});
    }

    visible() {
        cy.url().should('include', '/log-view');
    }
}

export default LogViewPage;
