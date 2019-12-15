describe('The Login Page', function () {
  it('Login and turn to home page', function () {
    // programmatically log us in without needing the UI
    cy.visit('/login')
    cy.setCookie('id', '5df3a2e4561ab52a442881ef')
    cy.contains(' Username:')
    cy.contains(' Password:')
    cy.get('#__BVID__50').type('Wiaa')
    cy.get('#__BVID__51').type('aaaaaaaaa')
    cy.get('#app > div > div > div > p > div > div:nth-child(6) > button').click()
    cy.url().should('include', '/')
    cy.getCookie('id').should('have.property', 'value', '5df3a2e4561ab52a442881ef')
  })

  it('turn to register page', function () {
    cy.get('#app > div > div > div > p > div > div:nth-child(6) > a').click()
    cy.url().should('include', '/register')
    cy.getCookies().should('be.empty')
  })
})
