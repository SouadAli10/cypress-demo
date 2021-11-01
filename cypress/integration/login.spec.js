import * as users from '../fixtures/users.json';

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').as('usernameInput');
    cy.get('[data-test="password"]').as('passwordInput');
    cy.get('[data-test="login-button"]').as('loginButton');
    cy.clearCookies();
  })

  it('Login with a valid user', () => {
    cy.get('@usernameInput').type(users.acceptable_user.username);
    cy.get('@passwordInput').type(users.acceptable_user.password);
    cy.get('@loginButton').click();
    cy.url().should('include', '/inventory.html');
    cy.getCookie('session-username').should('have.property', 'value', users.acceptable_user.username);
  })

  it('Login with a user that has performance issues', () => {
    ///the test for the performance issue is the same the only thing is to create a test case with a timeout that currently does not exist
    cy.get('@usernameInput').type(users.glitch_user.username);
    cy.get('@passwordInput').type(users.glitch_user.password);
    cy.get('@loginButton').click();
    cy.url().should('include', '/inventory.html');
    cy.getCookie('session-username').should('have.property', 'value', users.glitch_user.username);
  })

  it('Login with a user that has problem user', () => {
    cy.get('@usernameInput').type(users.problem_user.username);
    cy.get('@passwordInput').type(users.problem_user.password);
    cy.get('@loginButton').click();
    cy.url().should('include', '/inventory.html');
    cy.getCookie('session-username').should('have.property', 'value', users.problem_user.username);
    ///validation would need to be done depending on the definition of a problem user
  })

  it('Login with a user that is locked out', () => {
    cy.get('@usernameInput').type(users.locked_out_user.username);
    cy.get('@passwordInput').type(users.locked_out_user.password);
    cy.get('@loginButton').click();
    cy.url().should('not.include', '/inventory.html');
    cy.getCookie('session-username').should('have.property', 'value', users.locked_out_user.username);
    cy.get('[data-test=error]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
  })

  it('Login with a user that does not exist and remove error message', () => {
    cy.get('@usernameInput').type('test');
    cy.get('@passwordInput').type('test');
    cy.get('@loginButton').click();
    cy.url().should('not.include', '/inventory.html');
    cy.getCookie('session-username').should('not.exist');
    cy.get('[data-test=error]')
      .should('contain', 'Epic sadface: Username and password do not match any user in this service');
    cy.get('.svg-inline--fa.fa-times-circle.fa-w-16.error_icon').should('have.length', 2);
    cy.get('button.error-button').click();
    cy.get('[data-test=error]').should('not.exist');
  })

  it('Login with a missmatch username and password', () => {
    cy.get('@usernameInput').type(users.acceptable_user.username);
    cy.get('@passwordInput').type('test');
    cy.get('@loginButton').click();
    cy.url().should('not.include', '/inventory.html');
    cy.getCookie('session-username').should('not.exist');
    cy.get('[data-test=error]')
      .should('contain', 'Epic sadface: Username and password do not match any user in this service');
  })

  it('show error message when login without username and password', () => {
    cy.get('@loginButton').click();
    cy.get('[data-test=error]')
      .should('contain', 'Epic sadface: Username is required');
  })

  it('show error message when login without username', () => {
    cy.get('@passwordInput').type('test');
    cy.get('@loginButton').click();
    cy.get('[data-test=error]')
      .should('contain', 'Epic sadface: Username is required');
  })

  it('show error message when login without password', () => {
    cy.get('@usernameInput').type('test');
    cy.get('@loginButton').click();
    cy.get('[data-test=error]')
      .should('contain', 'Epic sadface: Password is required');
  })

})