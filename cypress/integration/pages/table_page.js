class TablePage {
    constructor(tableName, isCreateDatatable) {
        this.tableName = tableName;
        this.elementName = isCreateDatatable ? "#create-new-table" : ".table-detail";
    }
    doActionInsideTable(callback) {
        cy.get(this.elementName).within(() => {
            if(callback) callback();
        });
    }
    addMoreColumn() {
        this.doActionInsideTable(() => {
            cy.get(".btn-link").contains("Add Column").click();
            cy.get("input[data-cy='name']").last().should("have.value", "");
        });
    }
    tableLoaded() {
        cy.get("#root").find("table").first().find("tbody").should("contain", "_id");
    }
    clickUpdate() {
        cy.get("button").contains("Update").click({ force: true });
    }
    fillTableName() {
        cy.get("input[data-cy='tableName']").clear().type(this.tableName).should("have.value", this.tableName);
    }
    fillTableTTL(val) {
        cy.get("input[data-cy='ttl']").clear().type(val);
    }
    setColumn(index, name, type) {
        this.doActionInsideTable(() => {
            cy.get('[data-cy="name"]').eq(index).clear().type(name);
            cy.get('[name="type"]').eq(index).select(type);
        });
    }
    deleteColumn(index) {
        this.doActionInsideTable(() => {
            cy.get(".btn-outline-danger").eq(index).click();
        });
    }
    clickCreate() {
        cy.get("button").contains("Create Datatable").click();
    }
    isCreateDatatableSuccess() {
        cy.wait(1500);
        cy.get(".project-list").get("li[role='button']").last().should("have.text", this.tableName);
    }
    isColumnNotExistAfterRemove(columnName) {
        this.doActionInsideTable(() => {
            cy.contains(columnName).should('not.exist')
        });
    }
}

export default TablePage;
