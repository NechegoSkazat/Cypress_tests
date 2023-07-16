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

Cypress.Commands.add('addCustomerFieldStyle', (id, placeholder) =>{
	cy.log(`Check '${placeholder}' field style`)
	cy.get('#'+id)
		.should('be.visible')
		.and('have.attr', 'placeholder', placeholder)
		.and('have.css', 'height', '52.5px')
		.and('have.css', 'border-radius', '4px')
		.and('have.css', 'border', '0.8px solid rgb(222, 225, 227)')
		.and('have.css', 'background-color', 'rgba(144, 144, 144, 0.075)')
		.and('have.css', 'padding', '0px 15px')
});


Cypress.Commands.add('enterValidData', (data) =>{
	cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
		if(data.status == 'done') {
				cy.get('label[for = "done"]')
					.click();
			} else {
				cy.get('label[for = "pending"]')
					.click();
			}
		cy.get('#fname')
			.type(data.firstname)
			.should('have.value', data.firstname)
		cy.get('label[id="message"]')
			.should('be.hidden')

		cy.get('#lname')
			.type(data.lastname)
			.should('have.value', data.lastname)
		cy.get('label[id="message50"]')
			.should('be.hidden')
		
		cy.get('#email')
			.type(data.email)
			.should('have.value', data.email)
		cy.get('label[id="message9"]')
			.should('be.hidden')
		
		cy.get('#telephoneno')
			.type(data.telephone)
			.should('have.value', data.telephone)
		cy.get('label[id="message7"]')
			.should('be.hidden')
		
		cy.get('textarea[name="addr"]')
			.type(data.address)
			.should('have.value', data.address)
		cy.get('label[id="message3"]')
			.should('be.hidden')		
});

Cypress.Commands.add('enterOverlengthData', (data) =>{
	cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
		if(data.status == 'done') {
				cy.get('label[for = "done"]')
					.click();
			} else {
				cy.get('label[for = "pending"]')
					.click();
			}
		cy.get('#fname')
			.type(data.firstname)
			.should('have.value', data.firstname.slice(0, 100))

		cy.get('#lname')
			.type(data.lastname)
			.should('have.value', data.lastname.slice(0, 100))
		
		cy.get('#email')
			.type(data.email)
			.should('have.value', data.email.slice(0, 254))
		
		cy.get('#telephoneno')
			.type(data.telephone)
			.should('have.value', data.telephone.slice(0, 200))
		
		cy.get('textarea[name="addr"]')
			.type(data.address)
			.should('have.value', data.address.slice(0, 100))
});


Cypress.Commands.add('correctFormSubmitting', (data) =>{
		cy.enterValidData(data);
		cy.get('input[type="submit"]')
			.click();
		let customerID;

		cy.get('#main > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > h3')
		  .invoke('text')
		  .then((text) => {
		    customerID = text;
		    cy.log(customerID);
			cy.log('Check if user exist')
		    cy.visit('https://demo.guru99.com/telecom/billing.php')
		    cy.get('#customer_id')
		    	.type(customerID)
	    	cy.get('input[name="submit"]')
	    		.click()	    		
    			cy.get('#main > div > h3', { timeout: 10000 })
    				.invoke('text')
    				.should('contain', customerID)
    				.and('contain', data.firstname)
			
			cy.log('Check if user active')
			if (data.status == 'done') {
				var status = 'ACTIVE'
			} else if (data.status == 'pending') {
				var status = 'INACTIVE'
			}

			cy.visit('https://demo.guru99.com/telecom/assigntariffplantocustomer.php')
			cy.get('#customer_id')
				.type(customerID)
			cy.get('input[type="submit"]')
				.click()
			cy.get('#main > div > p > font')
				.invoke('text')
				.should('eq', status)

			})
}); 


Cypress.Commands.add('customerFieldValidation', (selector, data, message, messageID) =>{
	cy.visit('https://demo.guru99.com/telecom/addcustomer.php')
	if (selector == '#fname') { let messageID = "message"}
		else if (selector == '#lname') { let messageID = "message50"}
		else if (selector == '#email') { let messageID = "message9"}
		else if (selector == '#telephoneno') { let messageID = "message7"}
		else if (selector == 'textarea[name="addr"]') { let messageID = "message3"}

	cy.get(selector)
			.clear()
			.type(data)
			.should('have.value', data)
		if(selector == '#fname') { let messageID = "message"}
			else if (selector == '#lname') { let messageID = "message50"}
			else if (selector == '#email') { let messageID = "message9"}
			else if (selector == '#telephoneno') { let messageID = "message7"}
			else if (selector == 'textarea[name="addr"]') { let messageID = "message3"}
			else {console.log('Not found')}
		cy.get(`label[id="${messageID}"]`)
			.should('have.text', message)
});