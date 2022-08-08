class DatabasePage {
    constructor(newTableForTest) {
        this.tableName = newTableForTest;
    }
    selectTable() {
        cy.get(".project-list").get("li[role='button']").contains(this.tableName).click();
    }
    tableLoaded(tableLoaded) {
        cy.get('[data-cy="table-name"]').should("have.value", tableLoaded || this.tableName);
        cy.get('input[value="_id"]').should("be.disabled");
    }
    clickUpdate() {
        cy.get("button").contains("Update").click();
    }
    clickLogViewSetting() {
        cy.get("button").contains("Log view setting").click();
    }
    clickCreateTable() {
        cy.get("button").contains("Create new datatable").click();
        cy.get("#create-new-table").should("have.class", "show");
    }
    clickDelete() {
        cy.get('.table-detail').within(() => {
            cy.get(".btn-outline-danger").contains("Delete datatable").click();
        })
    }
    open() {
        cy.get("a.nav-item").contains("Settings").click({ force: true });
        cy.get("#pills-databases-tab").click();
    }

    visible() {
        cy.url().should("include", "databases");
        cy.intercept("GET", "/api/table").as("loadTable");
        cy.waitFor("@loadTable");
        cy.get("small").contains("Datatables").should("be.visible");
    }

    isTableNotExist() {
        cy.get(".project-list").contains(this.tableName).should("not.exist");
    }
}

export default DatabasePage;
