describe('Training', () => {
    beforeEach('Visits the initial project page', () => {
        cy.visit('/Training')
    });

    it('should submit form', () => {
        cy.get('.add-training-btn').click();

        cy.get('#new-holiColab').select('Manel');
        cy.get('#new-holiStart').type('2024-06-01');
        cy.get('#new-holiEnd').type('2024-06-05');

        cy.get('button[type="submit"]').click();

        cy.contains('Training pendent').should('be.visible');
    });
})
