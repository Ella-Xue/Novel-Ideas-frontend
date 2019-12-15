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

  describe('give grade to the novel', () => {
    beforeEach(() => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 5)
      // Click trash/delete link of 3rd donation in list
      cy.get('tbody')
        .find('tr')
        .eq(2)
        .find('td')
        .eq(6)
        .find('a')
        .click()
    })
    it('get the information of the novel', () => {
      cy.get('tbody')
        .find('tr')
        .should('have.length', 1)
      cy.contains('Where are you')
      cy.contains('History')
      cy.contains('AF')
      cy.contains('Wiaa')
    })
    it('give grade to the novel', () => {
      cy.get('#app1 > div.text-center.container > div > div:nth-child(2) > input').clear().type(5)
      cy.get('#app1 > div.text-center.container > div > div:nth-child(3) > button').click()
      cy.get('tbody')
        .find('td')
        .eq(0)
        .contains(5)
    })
    it('give comment to the novel', () => {
      cy.get('#textarea').clear().type('I like it')
      cy.get('#app1 > div:nth-child(5) > div > div.col > button').click()
      cy.get('tbody')
        .find('td')
        .eq(1)
        .contains('I like it')
      // #__BVID__54 > tbody > tr > td:nth-child(2) > div
    })
  })
})
