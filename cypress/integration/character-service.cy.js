// cypress/integration/character-service.spec.js
/// <reference types="cypress" />

import axios from 'axios'
import CharacterService from '../../src/services/CharacterService' // Update the path to your CharacterService file

// Stub the axios.get method to return test data
Cypress.Commands.add('stubGet', (url, responseData) => {
  cy.on('window:before:load', (win) => {
    const stub = cy.stub(axios, 'get').as('getCharacters')
    stub.withArgs(url).resolves({ data: responseData })
  })
})

describe('CharacterService', () => {
  it('should fetch characters correctly', () => {
    // Test data to simulate API response
    const responseData = {
      results: [
        { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: 'rick.png' },
        { id: 2, name: 'Morty', status: 'Dead', species: 'Human', image: 'morty.png' },
      ],
    }

    // Stub the axios.get method to return the test data
    cy.stubGet('https://rickandmortyapi.com/api/character/?page=1&name=&status=', responseData)

    // Create an instance of CharacterService
    const characterService = new CharacterService()

    // Call the getCharacters method with test data
    characterService.getCharacters({ currentPage: 1, searchQuery: '', statusFilter: '' }).then((response) => {
      // Assert the response data
      expect(response).to.deep.equal(responseData)
    })
  })
})
