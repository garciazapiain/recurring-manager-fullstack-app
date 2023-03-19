describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Navigates to user products page', () => {
    cy.intercept('https://recurring-manager-app.herokuapp.com/api/products/', { fixture: 'products.json' }).as('getDataProducts')
    cy.wait('@getDataProducts');
    cy.get('h1').contains('My products').should('exist');
    cy.get('[data-cy="user-page-all-products-button"]').click();
    cy.get('table tbody')
      .find('tr')
      .then((rows) => {
        if (rows.length > 0) {
          cy.wrap(rows).each((row) => {
            cy.wrap(row).within(() => {
              cy.get('th').eq(0).should('exist'); // assert that the first column exists
              cy.get('th').eq(1).should('exist'); // assert that the second column exists
              cy.get('th').eq(2).should('exist'); // assert that the third column exists
            });
          });
        } else {
          cy.log('No product rows found');
        }
      });
  });

  it('Navigates to product categories and asserts product table columns exist', () => {
    cy.get('[data-cy="nav-bar-burger"]').click();
    cy.get('[data-cy="nav-bar-product-categories"]').click();
    cy.intercept('https://recurring-manager-app.herokuapp.com/api/productcategories/', { fixture: 'categories.json' }).as('getCategories');
    cy.wait('@getCategories');
    cy.get('.category-section').should('exist', { timeout: 10000 });
    cy.get('.category-banner').eq(0).click();
    cy.intercept('https://recurring-manager-app.herokuapp.com/api/products/', { fixture: 'products.json' }).as('getDataProducts')
    cy.get('table tbody')
      .find('tr')
      .then((rows) => {
        if (rows.length > 0) {
          cy.wrap(rows).each((row) => {
            cy.wrap(row).within(() => {
              cy.get('th').eq(0).should('exist'); // assert that the first column exists
              cy.get('th').eq(1).should('exist'); // assert that the second column exists
              cy.get('th').eq(2).should('exist'); // assert that the third column exists
            });
          });
        } else {
          cy.log('No product rows found');
        }
      });
  });
});
