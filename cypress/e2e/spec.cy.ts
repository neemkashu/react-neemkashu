describe('template spec', () => {
  const PROXY_URL = 'https://sore-plum-skunk-wig.cyclic.app';

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: PROXY_URL, // that have a URL that matches '/users/*'
      },
      [] // and force the response to be: []
    ).as('getPhotos'); // and assign an alias
  });

  it('passes', () => {
    cy.visit(' http://localhost:5173/form');

    cy.contains(/about/i).click();
    cy.url().should('include', '/about');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Fetch initial card and new query', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:5173/about');
    cy.get('.flex > :nth-child(1) > .p-1').click();
    cy.get('p').should('be.visible');
    cy.get('.grid > :nth-child(1)', { timeout: 8000 }).should('be.visible');
    cy.get('._input_1y23s_1').type('bird');
    cy.get('.flex-row > .self-center').click();
    cy.get('.grid > :nth-child(1)', { timeout: 5000 }).should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Fetch info for modal', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:5173/');
    cy.get(':nth-child(1) > .flex-wrap > .flex-col > .self-center').click();
    cy.get('.m-auto > .flex-wrap', { timeout: 5000 }).should('be.visible');
    cy.get('.fixed').should('be.visible');
    cy.get('.self-end').click();
    cy.get(':nth-child(2) > .flex-wrap > .flex-col > .self-center').click();
    cy.get('.m-auto > .flex-wrap', { timeout: 5000 }).should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
});
