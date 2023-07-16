const card_data = require('../../fixtures/payment_gateway.json');


describe('Payment Gateway page elements and positive cases', () =>{
	it.skip('Pay with valid card data and insufficient balance', () => {
		cy.log('Check mastercard insufficient balance input')
		cy.paymentProcess(card_data.mastercard, 9)

		cy.log('Check AmEx insufficient balance input')
		cy.paymentProcess(card_data.AmEx, 9)
	})


	it.skip('Payment Gateway page fields validation', () => {
		cy.payNumberOfGoods(1)
		cy.log('Card Number validation')
		cy.negativeFieldValidation('#card_nmuber', '123456789RWS3456', '#message1', 'Characters are not allowed')
		cy.negativeFieldValidation('#card_nmuber', '123456789!"№3456', '#message1', 'Special characters are not allowed')
		cy.emptyFieldValidation('#card_nmuber', '#message1', 'Field must not be blank')
		cy.checkOverlength('#card_nmuber', '12345678901234567', 16)

		cy.log('Check 14 digits card number (negative)')
		cy.inputCardData(card_data.mastercard)
		cy.get('#card_nmuber')
			.clear()
			.type('12345678901234')
		const stub = cy.stub(); 
		cy.on ('window:alert', stub);
		cy.get('input[name="submit"]')
				.click()
				.then(() => {
		    		expect(stub).to.be.called;
			     	expect(stub.getCall(0)).to.be.calledWith('Check card number is 16 digits!') 
				});     

		cy.negativeFieldValidation('#cvv_code', '1A3', '#message2', 'Characters are not allowed')
		cy.negativeFieldValidation('#cvv_code', '1@3', '#message2', 'Special characters are not allowed')
		cy.emptyFieldValidation('#cvv_code', '#message2', 'Field must not be blank')
		cy.checkOverlength('#cvv_code', '12345', 4)

		cy.log('Check 2 digits CVV-code (negative)')
		cy.inputCardData(card_data.test)
		cy.get('#cvv_code')
			.clear()
			.type('12')
		cy.on ('window:alert', stub);
		cy.get('input[name="submit"]')
		cy.get('body')
			.should('contain', 'Payment denied')	
	});     

	it('Check expired card', () => {
		cy.payNumberOfGoods(1)
		cy.inputCardData(card_data.mastercard)
		var currentDate = new Date();
		var currentMonth = currentDate.getMonth() + 1;
		var currentYear = currentDate.getFullYear();
		if (currentMonth == 1) {
			var expirationMonth = 12;
			var expirationYear = currentYear-1}
		else {
			var expirationMonth = currentMonth-1;
			var expirationYear = currentYear
		}

		cy.log('select Expiration month')
		cy.get('select[id="month"]')
			.select(expirationMonth)
			.should('have.value', expirationMonth)

		cy.log('select Expiration year')
		cy.get('select[id="year"]')
			.select(expirationYear)
			.should('have.value', expirationMonth)
	})
});
