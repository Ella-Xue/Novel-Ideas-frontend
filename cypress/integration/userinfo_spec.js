describe('All novels page', () => {
  beforeEach(() => {
    cy.setCookie('id', '5df3e25c99c11500173bec47')
    cy.visit('/')
    // Click Donate navbar link
    cy.get('.navbar-nav')
      .eq(1)
      .find('.nav-item')
      .eq(0)
      .click()
    cy.get('#__BVID__39 > ul > li:nth-child(2) > a').click()
  })
  describe('edit information', () => {
    it('show the edit page and change info', () => {
      cy.get('#app > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > a').click()
      cy.url().should('include', '/editInfo')
      cy.get('#input4').clear().type('qqq@qqq.qqq')
      cy.get('#bt1').click()
      cy.get('#u4').contains('qqq@qqq.qqq')
    })
  })
  describe('change password', () => {
    it('give invalid id', () => {
      cy.get('#app > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > a').click()
      cy.url().should('include', '/changePsd')
      cy.contains('The password must be more than 8 digital')
      cy.contains('The new password must be different from the original one')
      cy.contains('The password must be the same as the former one')
    })
    it('change the password', () => {
      cy.get('#app > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > a').click()
      cy.url().should('include', '/changePsd')
      cy.get('#p1').type('1212121212')
      cy.get('#p2').type('qqqqqqqqq')
      cy.get('#p3').type('qqqqqqqqq')
      cy.get('#bt1').click()
      cy.url().should('include', '/login')
    })
  })
})
