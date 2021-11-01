import * as users from '../fixtures/users.json';

describe('Login Cookies tests', () => {
  beforeEach(() => {
    cy.clearCookies()
  })

  it('user can not access products page throught direct link', () => {
    cy.visit('/?/inventory.html').then(() => {
      cy.url().should('contain', '/');
      cy.get('[data-test=error]')
        .should('contain', 'Epic sadface: You can only access \'/inventory.html\' when you are logged in');
    });
  })

  it('user can access products page throught direct link if cookies are set with valid user value', () => {
    cy.setCookie('session-username', users.acceptable_user.username);
    cy.visit('/?/inventory.html');
    cy.url().should('contain', '/inventory.html');
  })

  it('user can access products page throught direct link if cookies are set with non valid user value', () => {
    cy.setCookie('session-username', 'test');
    cy.visit('/?/inventory.html');
    cy.url().should('contain', '/');
    cy.get('[data-test=error]')
      .should('contain', 'Epic sadface: You can only access \'/inventory.html\' when you are logged in');
  })

})