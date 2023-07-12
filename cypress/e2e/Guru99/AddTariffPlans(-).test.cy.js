const BASE_URL = 'https://demo.guru99.com/telecom/addtariffplans.php'


describe('Tours page', () =>{
	it('Blank form submitting', () => {
		cy.log('positive check');
		cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
		const stub = cy.stub();  
		cy.on ('window:alert', stub);		
		cy.get('input[name = "submit"]').click()
	    	.then(() => {
	    		expect(stub).to.be.called
		      expect(stub.getCall(0)).to.be.calledWith('please fill all fields Correct Value')      
		    })  
	});

	it('AddTariffs form validation', () => {
		cy.log('Check AddTariffs form validation');
		cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
		cy.tariffsValidation('rental1', 'message2', 5);
		cy.tariffsValidation('local_minutes', 'message3', 5);
		cy.tariffsValidation('inter_minutes', 'message4', 5);
		cy.tariffsValidation('sms_pack', 'message5', 5);
		cy.tariffsValidation('minutes_charges', 'message6', 3);
		cy.tariffsValidation('inter_charges', 'message7', 3);
		cy.tariffsValidation('sms_charges', 'message8', 3);
	});
})
