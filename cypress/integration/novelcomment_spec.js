const apiURL = 'https://novelideas-api.herokuapp.com/novels/'

describe('Add novels', () => {
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
  describe('Comment on a novel', () => {
    it('show comments on the novel', () => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 5)
      cy.get('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(8)
        .find('a')
        .click()
      cy.contains('Novel Comments')
    })
  })
})
