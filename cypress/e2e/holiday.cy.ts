describe('Training', () => {
  beforeEach('Visits the initial project page', () => {
    cy.visit('/Training')
  });

  it('toggle add training form pop-up', () => {
    cy.get('.add-training-btn').click();
    cy.get('.add-training-form').should('exist');

    cy.get('.close').click();
    cy.get('.add-training-form').should('not.exist');
  });

  it('should submit form', () => {
    let initialRowCount = 0;
    cy.get('table tbody tr').then(($rows) => {
      initialRowCount = $rows.length;
    })

    cy.get('.add-training-btn').click();

    cy.get('#new-holiColab').select('Manel');
    cy.get('#new-holiStart').type('2024-06-01');
    cy.get('#new-holiEnd').type('2024-06-05');

    cy.get('button[type="submit"]').click();

    cy.contains('Training pendent').should('be.visible');

    cy.get('table tbody tr').should('have.length', initialRowCount + 1);
  });

  it('should go to trainings in period', () => {
    cy.get('table tbody tr').then(() => {
      cy.contains('Férias em Período').click();

      cy.url().should('include', '/Training/trainings-in-period');
    });
  });

  it('should go to colabs with more than x days', () => {
    cy.get('input[type="number"]').type('1');

    cy.contains('Procurar Colaboradores').click();

    cy.url().should('include', '/Training/colaborator');
  });
})


// describe('Training', () => {
//   beforeEach('Visits the initial project page', () => {
//     cy.visit('/')
//   });

//   it('show trainings', () => {
//     let initialRowCount = 0;
//     let name;

//     cy.get('.colaborator-item').then(($rows) => {
//       initialRowCount = $rows.length;

//       cy.get('.colaborator-name').first().invoke('text').then((text) => {
//         name = text;

//         cy.get('.buttonTraining').first().click();

//         cy.get('h2').should('have.text', name);
//       });
//     });
//   });


//   it('should add an training', () => {
//     cy.get('.buttonTraining').first().click();

//     let initialRowCount = 0;
//     cy.get('.trainings tbody tr').then(($rows) => {
//       initialRowCount = $rows.length;

//       cy.get('.add-training-btn').click();

//       cy.get('#new-holiColab').select('Manel');
//       cy.get('#new-holiStart').type('2023-06-01');
//       cy.get('#new-holiEnd').type('2023-06-05');

//       cy.get('button[type="submit"]').click();

//       cy.contains('Training pendent').should('be.visible');

//       cy.get('.trainings tbody tr').should('have.length', initialRowCount + 1);
//     })
//   });
// })

