// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getNavigationElement', (elementName, pageLink) =>{
	cy.log(`check navigation element ${elementName}`)
	cy.get('#navbar-brand-centered')
		.then(jqElement =>{
			cy.contains('a', elementName)
				.should('be.visible')
				.and('have.css', 'color', 'rgb(255, 255, 255)')
				.click();
			cy.url().should('eq', pageLink);
			cy.go('back');
		})
});

Cypress.Commands.add('getHeaderElement', (elementName, pageLink) =>{
	cy.log(`check header element ${elementName} text link`)
	cy.get('[class="row topper"]')
		.then(jqElement =>{
			cy.contains('a', elementName)
			.should('be.visible')
			.click();
			cy.url().should('eq', pageLink);
			cy.go('back');
		});	
	cy.log(`check header element ${elementName} image link`)
	cy.get('[class="row topper"]')
		.then(jqElement =>{
			cy.contains('a', elementName)
				.parent()
				.find('img')
				.should('be.visible')
				.click();
			cy.url()
				.should('eq', pageLink);
			cy.go('back');
		})
});

Cypress.Commands.add('getDropdownElement', (elementName, pageName, pageLink) => {
	cy.log(`check element ${pageName} of dropdown ${elementName}`)
	cy.contains('a', elementName)
		.click();
	cy.get('[class="dropdown-menu"]')
		.children()
		.contains('a', pageName)
		.should('be.visible')
		.click();
	cy.url()
		.should('eq', pageLink);
	cy.go('back');

})

Cypress.Commands.add('tariffsValidation', (field, message, maxlength) => {
	var maxvalue = '9'.repeat(maxlength)
	cy.log(`Input character into ${field}, (-)`)
	cy.get(`input[id = ${field}]`)
		.type('w');
	cy.get(`label[id = ${message}]`)
		.should('be.visible')
		.and('have.text', 'Characters are not allowed')
		.and('have.css', 'color', 'rgb(114, 122, 130)')
		.and('have.css', 'font-size', '12.6px');

	cy.log(`Input special character into ${field}, (-)`)
	cy.get(`input[id = ${field}]`)
		.clear()
		.type('!');
	cy.get(`label[id = ${message}]`)
		.should('be.visible')
		.and('have.text', 'Special characters are not allowed')
		.and('have.css', 'color', 'rgb(114, 122, 130)')
		.and('have.css', 'font-size', '12.6px');

	cy.log(`Input overlength into ${field}, (-)`)
	cy.get(`input[id = ${field}]`)
		.clear()
		.type('999999')
		.should('have.value', maxvalue);


	const tariff_packs = ['local_minutes', 'inter_minutes', 'sms_pack']
	if(tariff_packs.includes(field)){
		cy.log(`Input float into ${field}, (-)`)
		cy.get(`input[id = ${field}]`)
			.clear()
			.type('0.1')
			.should('have.value', '0.1');
		cy.get(`label[id = ${message}]`)
			.should('be.visible')
			.and('have.text', 'Special characters are not allowed')
	}
});


