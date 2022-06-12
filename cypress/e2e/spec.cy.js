describe('Default with text element', () => {
  it('Server started', () => {
    cy.visit('http://localhost:8080/cypress/pages/text.html');
  });

  it('Has #marquee element and is of width 500px', () => {
    cy
      .get('#marquee')
      .invoke('width')
      .should('be.eq', 500);
  });

  it('#marquee should be outside of view after initializaton', () => {
    cy
      .window()
      .invoke('start')
      .get('.js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().x)
      .should('be.eq', 500);
  });

  it('#marquee should be outside of view after duration', () => {
    cy
      .wait(9860) // 8960 + 1000 - 10
      .get('.js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().x)
      .should('be.lt', -380);
  });

  it('#marquee should restart', () => {
    cy
      .wait(200) // 8960 + 1000 - 10
      .get('.js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().x)
      .should('be.lt', 480);
  });
});