const apiURL = 'https://novelideas-api.herokuapp.com/author/'

describe('Add Authors', () => {
  beforeEach(() => {
    cy.setCookie('id', '5df3e25c99c11500173bec47')
    cy.request(apiURL)
      .its('body')
      .then(authors => {
        authors.forEach(element => {
          cy.request('DELETE', `${apiURL}${element._id}`)
        })
      })
    cy.fixture('author').then(authors => {
      let [n1, n2, n3, n4, n5] = authors
      let allauthors = [n1, n2, n3, n4, n5]
      allauthors.forEach(authors => {
        cy.request('POST', apiURL, authors)
      })
    })
    cy.visit('/')
    // Click Donate navbar link
    cy.get('.navbar-nav')
      .eq(0)
      .find('.nav-item')
      .eq(3)
      .click()
    cy.get('#__BVID__31 > ul > li:nth-child(2) > a').click()
  })
  describe('Add a author', () => {
    describe('With valid attributes', () => {
      it('allows donation to be submitted', () => {
        //  Fill out web form
        cy.get('#app1 > div > div > div > form > div:nth-child(1) > input').type('WW')
        cy.get('#type1').select('Magic')
        cy.get('#type2').select('Romantic')
        cy.get('#app1 > div > div > div > form > div:nth-child(4) > input').clear().type(5)
        cy.get('#app1 > div > div > div > form > p > button').click()
        cy.wait(1000)
        cy.visit('/Authors')
        cy.get('tbody')
          .find('tr')
          .should('have.length', 6)
      })
    })
  })
})
