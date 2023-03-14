describe('app user paths', () => {
    it('should display the correct headline', () => {
      cy.visit('http://localhost:3000'); 
      cy.get('h1').contains('Home Page');
      cy.get('[data-cy="product-categories"]').click();
      cy.intercept('https://recurring-manager-app.herokuapp.com/api/productcategories/', { fixture: 'categories.json' }).as('getData');
      cy.wait(1000)
      cy.get('.category-section').should('exist');
      cy.get('.category-banner').eq(0).click();
      cy.intercept('https://recurring-manager-app.herokuapp.com/api/productcategories/', { fixture: 'products.json' }).as('getDataProducts');
    });
  });