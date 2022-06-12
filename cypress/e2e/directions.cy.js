describe('Default with text element', () => {
  it('Server started', () => {
    cy.visit('http://localhost:8080/cypress/pages/text-directions.html');
  });

  it('Has #marquee elements and are of correct size', () => {
    cy
      .get('#marquee-r')
      .invoke('width')
      .should('be.eq', 500);

    cy
      .get('#marquee-u')
      .invoke('height')
      .should('be.eq', 37);

    cy
      .get('#marquee-d')
      .invoke('height')
      .should('be.eq', 37);
  });

  it('Start marquees', () => {
    cy
      .window()
      .invoke('start')
  });

  it('#marquee-r should be outside of view after initializaton', () => {
    cy
      .get('#marquee-r .js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().x - $el[0].parentElement.getBoundingClientRect().x)
      .should('be.eq', -396);
  });

  it('#marquee-u should be outside of view after initializaton', () => {
    cy
      .get('#marquee-u .js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().y - $el[0].parentElement.getBoundingClientRect().y)
      .should('be.eq', 37);
  });

  it('#marquee-d should be outside of view after initializaton', () => {
    cy
      .get('#marquee-d .js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().y - $el[0].parentElement.getBoundingClientRect().y)
      .should('be.eq', -37);
  });

  it('#marquee-r should be outside of view after duration', () => {
    cy
      .wait(8960)
      .get('#marquee-r .js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().x)
      .should('be.gt', 380);
  });

  it('#marquee-u should be outside of view after duration', () => {
    cy
      .wait(1140) // 11.000 - 9860
      .get('#marquee-u .js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().y - $el[0].parentElement.getBoundingClientRect().y)
      .should('be.lt', -37);
  });

  it('#marquee-d should be outside of view after duration', () => {
    cy
      .get('#marquee-d .js-marquee-wrapper')
      .then($el => $el[0].getBoundingClientRect().y - $el[0].parentElement.getBoundingClientRect().y)
      .should('be.gt', 37);
  });

});