const data = require('../../fixtures/addcustomer.json');
const BASE_URL = 'https://demo.guru99.com/telecom/addcustomer.php'


describe('AddCustomer page elements, validation and positive cases', () =>{
	it('Checking AddCustomer page elements', () => {
		cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
		
		cy.log('check Guru99 telecom logo')		
		cy.contains('a', 'Guru99 telecom')
			.should('be.visible')
			.and('have.css', 'color', 'rgb(246, 117, 94)')
			.and('have.css', 'font-family', 'Pacifico, cursive')
			.and('have.css', 'letter-spacing', '2px')
			.and('have.css', 'margin-top', '-5px')
			.and('have.css', 'display', 'inline-block')
			.click();		
		cy.url()
			.should('eq', 'https://demo.guru99.com/telecom/index.html');		
		cy.go('back');

		cy.log('Check "Add Customer" header style');
		cy.get('#main')
			.get('h1')
			.should('contain', 'Add Customer')
			.and('be.visible')
			.and('have.css', 'color', 'rgb(37, 162, 195)')
			.and('have.css', 'font-weight', '700')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'font-size', '29px');

		cy.log('Check customer data form elements style');
		cy.get('[class="row uniform"]')
			.then(jqElement =>{
				cy.contains('h3', 'Background Check')
					.should('be.visible')
					.and('have.css', 'color', 'rgb(37, 162, 195)')
					.and('have.css', 'font-weight', '700')
					.and('have.css', 'font-family', 'Montserrat, sans-serif')
					.and('have.css', 'font-size', '18px');
				cy.contains('h3', 'Billing address')
					.should('be.visible')
					.and('have.css', 'color', 'rgb(37, 162, 195)')
					.and('have.css', 'font-weight', '700')
					.and('have.css', 'font-family', 'Montserrat, sans-serif')
					.and('have.css', 'font-size', '18px');

				cy.log('Check radiobuttons titles')
				cy.contains('label[for = "pending"]', 'Pending')
					.should('be.visible')
				cy.contains('label[for = "done"]', 'Done')
					.should('be.visible');

				cy.log('Check radiobuttons')
				cy.get('#pending')
					.should('have.attr', 'type', 'radio')
					.should('exist')
				cy.get('#done')
					.should('have.attr', 'type', 'radio')
					.should('exist')

				cy.addCustomerFieldStyle('fname', 'FirstName');
				cy.addCustomerFieldStyle('lname', 'LastName');
				cy.addCustomerFieldStyle('email', 'Email');
				cy.addCustomerFieldStyle('telephoneno', 'Mobile Number');

				cy.log(`Check 'Address' field style`)
				cy.get('textarea[id = "message"]')
					.should('be.visible')
					.and('have.attr', 'placeholder', 'Enter your address')
					.and('have.css', 'border-radius', '4px')
					.and('have.css', 'border', '0.8px solid rgb(222, 225, 227)')
					.and('have.css', 'background-color', 'rgba(144, 144, 144, 0.075)')
					.and('have.css', 'padding', '11.25px 15px')
				})	

		cy.get('input[type="submit"]')
			.should('be.visible')
			.and('have.css', 'background-color', 'rgb(246, 117, 94)')
			.and('have.css', 'border-radius', '4px')
			.and('have.css', 'color', 'rgb(255, 255, 255)')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'padding', '0px 52.5px');	

		cy.get('input[type="reset"]')
			.should('be.visible')
			.and('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
			.and('have.css', 'border-radius', '4px')
			.and('have.css', 'color', 'rgb(114, 122, 130)')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'padding', '0px 52.5px');	
	});

	it('Check submitting with valid customer data', () => {
		cy.visit('https://demo.guru99.com/telecom/addcustomer.php');

		// cy.log('Check submitting nominal valid customer data')
		// cy.correctFormSubmitting(data.nominal)


		// cy.log('Check submitting minimal valid length customer data')
		// cy.correctFormSubmitting(data.test)


		// cy.log('Check submitting maximal valid length customer data')
		// cy.correctFormSubmitting(data.test)


		cy.correctFormSubmitting(data.test)

	});


	it('Check reset button', () => {
		cy.log('Checking reset button')
		cy.visit('https://demo.guru99.com/telecom/addcustomer.php');
		cy.enterValidData(data.test)

		cy.get('input[type="reset"]')
			.click()

		cy.get('#fname')
			.should('have.value', '')
		cy.get('#lname')
			.should('have.value', '')
		cy.get('#email')
			.should('have.value', '')
		cy.get('#telephoneno')
			.should('have.value', '')
		cy.get('textarea[name="addr"]')
			.should('have.value', '')
		const stub = cy.stub();  
		cy.on ('window:alert', stub);
		cy.get('input[type="submit"]')
			.click()
	    	.then(() => {
	    		expect(stub).to.be.called;
		     	expect(stub.getCall(0)).to.be.calledWith('please fill all fields') 
			});   
	});  	     
});
