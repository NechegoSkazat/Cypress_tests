const card_data = require('../../fixtures/payment_gateway.json');
const BASE_URL = 'https://demo.guru99.com/telecom/addcustomer.php'


describe('AddCustomer page elements, validation and positive cases', () =>{
	it('Checking AddCustomer page elements', () => {
		cy.payNumberOfGoods(9)
		cy.url()
			.should('eq', 'https://demo.guru99.com/payment-gateway/process_purchasetoy.php')
		cy.get('input[name="card_nmuber"]')
			.should('have.attr', 'placeholder', 'Enter Your Card Number');
		cy.get('select[id="month"]')
			.should('be.visible');
		cy.get('select[id="year"]')
			.should('be.visible');
		cy.get('input[name="cvv_code"]')
			.should('have.attr', 'placeholder', 'CVV Code');
		
		cy.get('#three > div > form > div.row > div > font:nth-child(2)')
		  		.invoke('text')
				.then((text) => {
					let total_amount = text.slice(1)
					cy.get('input[name="submit"]')
						.should('be.visible')
						.and('have.value', `Pay ${total_amount}`)
				})	
	}); 

	it('Pay with valid card data and sufficient balance', () => {
		cy.payNumberOfGoods(2)
		cy.inputCardData(card_data.mastercard)
		cy.payNumberOfGoods(2)
		cy.inputCardData(card_data.AmEx)
	})

});
