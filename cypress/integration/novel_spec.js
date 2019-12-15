const apiURL = 'https://novelideas-api.herokuapp.com/novels/'

describe('All novels page', () => {
  beforeEach(() => {
    cy.setCookie('id', '5df3e25c99c11500173bec47')
    cy.request(apiURL)
      .its('body')
      .then(novels => {
        novels.forEach(element => {
          cy.request('DELETE', `${apiURL}${element._id}`)
        })
      })
    cy.fixture('novel').then(novels => {
      let [n1, n2, n3, n4, n5] = novels
      let allnovels = [n1, n2, n3, n4, n5]
      allnovels.forEach(novels => {
        cy.request('POST', apiURL, novels)
      })
    })
    cy.visit('/')
    // Click Donate navbar link
    cy.get('.navbar-nav')
      .eq(0)
      .find('.nav-item')
      .eq(1)
      .click()
    cy.get('#__BVID__12 > ul > li:nth-child(1) > a').click()
  })

  describe('For a confirmed delete operation', () => {
    it('reduces the number of novels by 1', () => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 5)
      // Click trash/delete link of 3rd donation in list
      cy.get('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(7)
        .find('a')
        .click()
      cy.screenshot('delete-confirm')
      cy.get('button')
        .contains('Delete')
        .click()
      cy.get('tbody')
        .find('tr')
        .should('have.length', 4)
    })
  })
  describe('For a cancelled delete operation', () => {
    it('leaves the list unchanged', () => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 5)
      // Click trash/delete link of 3rd donation in list
      cy.get('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(7)
        .find('a')
        .click()
      // Click cancel button
      cy.get('button')
        .contains('Cancel')
        .click()
      cy.get('tbody')
        .find('tr')
        .should('have.length', 5)
    })
  })
})
