describe('template spec', () => {
  it('passes', () => {
    cy.visit(' http://localhost:5173');

    cy.contains(/about/i).click();
    cy.url().should('include', '/about');
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
