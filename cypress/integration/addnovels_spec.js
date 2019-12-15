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
      .eq(3)
      .click()
    cy.get('#__BVID__31 > ul > li:nth-child(1) > a').click()
  })
  describe('Add a novel', () => {
    describe('With valid attributes', () => {
      it('allows donation to be submitted', () => {
        //  Fill out web form
        cy.get('#app1 > div > div > div > form > div:nth-child(1) > input').type('You and me')
        cy.get('#app1 > div > div > div > form > div:nth-child(2) > input').type('WF')
        cy.get('#type').select('Romantic')
        cy.get('#app1 > div > div > div > form > div:nth-child(4) > input').type('Wiaa')
        cy.get('#app1 > div > div > div > form > div:nth-child(5) > input').clear().type(5)
        cy.get('label')
          .contains('Recommend reason')
          .next()
          .type('It is my favourite')
        cy.get('#app1 > div > div > div > form > p > button').click()
        cy.wait(10000)
        cy.get('tbody')
          .find('tr')
          .should('have.length', 6)
      })
    })
  })
})
