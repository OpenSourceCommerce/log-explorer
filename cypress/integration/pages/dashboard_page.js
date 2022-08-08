class DashboardPage {
    visible() {
        cy.url().should('include', '/dashboard/');
    }
    dateRange(label) {
        cy.get('#date-range').trigger("click");
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
    seeDashboard() {
        cy.get('.title').should('contain', 'Dashboard');
        cy.get('.react-grid-layout').should('exist');
    }
}

export default DashboardPage;
