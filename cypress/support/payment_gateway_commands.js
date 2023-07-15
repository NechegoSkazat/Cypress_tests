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

Cypress.Commands.add('payNumberOfGoods', (number) =>{
	cy.visit('https://demo.guru99.com/payment-gateway/index.php')
	cy.get('#three > div > form > div > div:nth-child(2) > h3')
		.invoke('text')
		.then((text) => {
			const price = text.slice(8);
			cy.log(price)
			cy.get('select[name="quantity"]')
				.select(number-1)
			cy.get('input[value="Buy Now"]')
				.click()
			cy.url()
				.should('eq', 'https://demo.guru99.com/payment-gateway/process_purchasetoy.php')
			cy.get('#three > div > form > div.row > div > font:nth-child(2)')
		  		.invoke('text')
				.then((text) => {
					let total_amount = Number(text.slice(2, -3))
					cy.log(total_amount)
					expect(total_amount).to.be.equal(number*price)
				})	
		})
});


Cypress.Commands.add('inputCardData', (data) =>{
	cy.log('input card number')
	cy.get('input[name="card_nmuber"]')
		.type(data.Card_Number)
		.should('have.value', data.Card_Number)

	cy.log('select Expiration month')
	cy.get('select[id="month"]')
		.select(data.Expiration_Month)
		.should('have.value', Number(data.Expiration_Month))

	cy.log('select Expiration year')
	cy.get('select[id="year"]')
		.select(data.Expiration_Year)
		.should('have.value', Number(data.Expiration_Year))

	cy.log('input CVV code')
	cy.get('input[name="cvv_code"]')
		.type(data.CVV)
		.should('have.value', data.CVV);
});

Cypress.Commands.add('paymentProcess', (data, quantity) =>{
	cy.payNumberOfGoods(quantity)
	cy.inputCardData(data)

	cy.log('Get total amount')
	cy.get('#three > div > form > div.row > div > font:nth-child(2)')
		.should('have.css', 'color', 'rgb(255, 0, 0)')
  		.invoke('text')
		.then((text) => {
			let total_amount = Number(text.slice(2, -3))
			let Balance = Number(data.Balance.slice(0, -1))
			cy.get('input[name="submit"]').click()
			cy.log(total_amount, Balance)
			if(total_amount <= Balance) {
				cy.url()
					.should('contains', 'https://demo.guru99.com/payment-gateway/genearte_orderid.php')					
				cy.get('#three')
					.should('contain', 'Payment successfull!')
					.should('contain', 'Order ID')}
			else {
				cy.get('body')
					.should('contain', 'Payment denied')
			}
		})
});

Cypress.Commands.add('negativeFieldValidation', (selector, data, messageID, message) =>{
	cy.get(selector).type(data)
	cy.get(messageID)
		.should('be.visible')
		.should('have.text', message)
});
			
Cypress.Commands.add('checkOverlength', (selector, data, maxlength) =>{
	cy.get(selector)
		.type(data)
		.should('have.value', data.slice(0, maxlength))
})
	