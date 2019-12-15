describe('add a user', () => {
  describe('with valid attributes', function () {
    it('add a user and turn to login page', function () {
      cy.visit('/register')
      // programmatically log us in without needing the UI
      cy.contains(' User Information')
      cy.get('#input-live').type('Amily')
        .should('have.value', 'Amily')
      cy.get('#radio-group-2 > div:nth-child(1) > label').click()
      cy.get('#__BVID__58').clear().type('20')
        .should('have.value', '20')
      cy.get('#__BVID__60').type('qwqwqwqwqw')
        .should('have.value', 'qwqwqwqwqw')
      cy.get('#input-rpsd').type('qwqwqwqwqw')
        .should('have.value', 'qwqwqwqwqw')
      cy.get('#__BVID__64').type('qwe@qwe.qwe')
        .should('have.value', 'qwe@qwe.qwe')

      cy.get('#register\\ form > button').click()
    })
  })
  describe('With invalid/blank attributes', () => {
    it('show invalid attributes ', () => {
      cy.visit('/register')
      cy.contains('Enter at least 3 letters')
      cy.contains('The password must be more than 8 digital')
    })
    it('shows error messages for enter different passwords ', () => {
      cy.visit('/register')
      // programmatically log us in without needing the UI
      cy.contains(' User Information')
      cy.get('#input-live').type('Amily')
        .should('have.value', 'Amily')
      cy.get('#radio-group-2 > div:nth-child(1) > label').click()
      cy.get('#__BVID__58').clear().type('20')
        .should('have.value', '20')
      cy.get('#__BVID__60').type('qwqwqwqwqw')
        .should('have.value', 'qwqwqwqwqw')
      cy.get('#input-rpsd').type('sssssssss')
        .should('have.value', 'sssssssss')
      cy.contains('The two password must be the same')
    })
  })
})
