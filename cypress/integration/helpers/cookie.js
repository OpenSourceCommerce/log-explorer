class CookieHelper {
    sessionId = null;
    
    setCookieDismiss() {
        cy.setCookie('cookieconsent_status', 'dismiss');
    }
    hasCookie(name) {
        cy.getCookie(name).should('exist')
    }

    hasNoCookie(name) {
        cy.getCookie(name).should('not.exist')
    }

    hasSessionId() {
        return this.sessionId !== null;
    }

    restoreSessionId() {
        cy.setCookie('PHPSESSID', this.sessionId);
    }

    saveSessionId() {
        cy.getCookie('PHPSESSID')
            .should('exist')
            .then(c => {
                this.sessionId = c.value;
            })
    }
}

export default CookieHelper;
