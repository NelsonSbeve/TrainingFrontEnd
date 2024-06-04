describe('Training', () => {
    beforeEach('Visits the initial project page', () => {
        cy.visit('/Training')
    });

    it('should display 1 colab with 3 days', () => {


        cy.visit('/Training/colaborator/3');

        cy.get('h2').contains('3');

        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length.at.least', 1);
    });

    it('should not display colabs with 4 days', () => {
        cy.visit('/Training/colaborator/4');

        cy.get('table').should('not.exist');
        cy.get('h3').contains('Não há colaboradores');
    });

    it ('when click Voltar, should go back', () => {
        cy.visit('/Training/colaborator/3');

        cy.contains('Voltar').click();

        cy.location('pathname').should('eq', '/Training');
    });
})
