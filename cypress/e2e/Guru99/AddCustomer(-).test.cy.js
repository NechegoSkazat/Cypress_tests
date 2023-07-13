const data = require('../../fixtures/addcustomer.json');
const BASE_URL = 'https://demo.guru99.com/telecom/addcustomer.php'


describe('addCustomer data fields validation', () =>{
	it('Check overlength data input', () => {		
		cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
		cy.enterOverlengthData(data.overlength)
	})

	it('addCustomer fields validation', () =>{
		cy.customerFieldValidation('#fname', '123', 'Numbers are not allowed', 'message')
		cy.customerFieldValidation('#fname', '!@#$%', 'Special characters are not allowed', 'message')
		cy.customerFieldValidation('#lname', '123', 'Numbers are not allowed', 'message50')
		cy.customerFieldValidation('#lname', '!@#$%', 'Special characters are not allowed', 'message50')
		cy.customerFieldValidation('#email', 'testemail.com', 'Email-ID is not valid', 'message9')
		cy.customerFieldValidation('#email', 'test@emailcom', 'Email-ID is not valid', 'message9')
		cy.customerFieldValidation('#email', 'te$t@email.com', 'Email-ID is not valid', 'message9')
		cy.customerFieldValidation('#telephoneno', '12346YW', 'Characters are not allowed', 'message7')
		cy.customerFieldValidation('#telephoneno', '*928!908', 'Special characters are not allowed', 'message7')
		cy.customerFieldValidation('textarea[id = "message"]', '!@#$%', 'Special characters are not allowed', 'message3')
	});
})
