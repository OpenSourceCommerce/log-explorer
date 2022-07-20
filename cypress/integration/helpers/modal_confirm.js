class ModalConfirmHelper {
    constructor(modalElement, bodyMessage) {
        this.modalElement = modalElement;
        this.bodyMessage = bodyMessage;
    }

    isModalExist(callback) {
        cy.get(this.modalElement)
            .should("have.class", "show")
            .within(() => {
                if (callback) callback();
            });
    }

    isBodyMessageExist() {
        this.isModalExist(() => {
            cy.get(".modal-body").should("have.text", this.bodyMessage);
        });
    }

    onClickConfirmAction() {
        this.isModalExist(() => {
            cy.get(".btn-danger").click();
        });
    }
}

export default ModalConfirmHelper;
