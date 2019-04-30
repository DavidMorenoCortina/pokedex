const API_DOMAIN = 'https://pokeapi.co/api/v2';

describe('List pokemons', () => {
    let polyfill;

    before(() => {
        const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
        cy.request(polyfillUrl)
            .then((response) => {
                polyfill = response.body
            });
    });

    let deleteFetch = () => ({
        onBeforeLoad(win)
        {
            delete win.fetch;
            // since the application code does not ship with a polyfill
            // load a polyfilled "fetch" from the test
            win.eval(polyfill);
            win.fetch = win.unfetch;
        }
    });

    it('Search', () => {
        cy.server();

        cy.route({
            method: 'get',
            url: API_DOMAIN + '/pokemon?offset=0&limit=1000'
        }).as('list');

        cy.visit('/', deleteFetch());

        cy.wait('@list');

        const pokemonName = 'bulbasaur';

        cy.get('.search-box input')
            .type(pokemonName)
            .should('have.value', pokemonName);

        cy.get('.card')
            .should('have.length', 1);
    });

    it('Card click expand', () => {
        cy.server();

        cy.route({
            method: 'get',
            url: API_DOMAIN + '/pokemon?offset=0&limit=1000'
        }).as('list');

        cy.visit('/', deleteFetch());

        cy.wait('@list');

        const pokemonName = 'bulbasaur';
        const pokemonId = 1;

        cy.get('.search-box input')
            .type(pokemonName);

        cy.get('.card')
            .first()
            .click()
            .parent()
            .should('have.class', 'selected');

        //Check route
        cy.url()
            .should('eq', 'http://localhost:3000/pokemon/' + pokemonName + '/' + pokemonId);

        cy.get('.card')
            .first()
            .click()
            .parent()
            .should('have.not.class', 'selected');

        cy.url()
            .should('eq', 'http://localhost:3000/');
    });

    it('Pokemon page', () => {
        cy.server();

        cy.route({
            method: 'get',
            url: API_DOMAIN + '/pokemon?offset=0&limit=1000'
        }).as('list');

        const pokemonName = 'bulbasaur';
        const pokemonId = 1;

        cy.visit('/pokemon/' + pokemonName + '/' + pokemonId, deleteFetch());

        cy.wait('@list');

        cy.get('.search-box input')
            .should('have.value', pokemonName);

        cy.get('.card')
            .should('have.length', 1);

        cy.get('.card')
            .first()
            .parent()
            .should('have.class', 'selected');
    });

    it('Redirect on invalid pokemon route', () => {
        cy.server();

        cy.route({
            method: 'get',
            url: API_DOMAIN + '/pokemon?offset=0&limit=1000'
        }).as('list');

        const pokemonName = 'qwertyuiop';
        const pokemonId = 1;

        cy.visit('/pokemon/' + pokemonName + '/' + pokemonId, deleteFetch());

        cy.wait('@list');

        cy.url()
            .should('eq', 'http://localhost:3000/');
    });
});