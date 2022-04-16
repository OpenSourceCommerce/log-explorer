class DashboardPage {
    visible() {
        cy.url().should('include', '/dashboard/');
    }
    dateRange(label) {
        cy.get('#date-range').click({force: true});
        cy.contains(label).click();
    }
    filter(query) {
        cy.get('#btn-filters').click()
        cy.get('.advanced-search').first()
            .find('input[name=query]').type(query, {timeout: 20000, force: true});

    }
    search() {
        cy.get('#btn-search').click({force: true});
    }
    seeDashboard(name) {
        cy.get('.react-grid-layout').should('contain', name);
    }
}

export default DashboardPage;
