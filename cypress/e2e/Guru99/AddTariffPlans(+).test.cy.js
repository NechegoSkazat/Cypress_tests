const BASE_URL = 'https://demo.guru99.com/telecom/addtariffplans.php'


describe('Addtariffplans page elements, validation and positive cases', () =>{
	it('Checking addtariffplans page elements', () => {
		cy.log('addtariffplans page');
		cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
		
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

		cy.log('Check "Add Tariff Plans" header style');
		cy.get('#main')
			.find('h1')
			.should('contain', 'Add Tariff Plans')
			.and('be.visible')
			.and('have.css', 'color', 'rgb(37, 162, 195)')
			.and('have.css', 'font-weight', '700')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'font-size', '29px')
			.and('have.css', 'line-height', '38px');


		cy.log('Check tariffs titles style');
		cy.get('[class="row uniform"]')
			.find('h3')
			.should('contain', 'Monthly Rental')
			.and('contain', 'Free Local Minutes')
			.and('contain', 'Free International Minutes')
			.and('contain', 'Free SMS Pack')
			.and('contain', 'Local Per Minutes Charges')
			.and('contain', 'International Per Minutes Charges')
			.and('contain', 'SMS Per Charges')
			.and('be.visible')
			.and('have.css', 'color', 'rgb(37, 162, 195)')
			.and('have.css', 'font-weight', '700')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'font-size', '18px')
			.and('have.css', 'line-height', '27px');
	});


	it('Valid tariff plans data submit', () => {
		cy.log('positive check');
		cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
		cy.get('input[id = "rental1"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'Monthly Rental')
			.type(1)
			.should('have.value', 1);
		cy.get('input[id = "local_minutes"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'Free Local Minutes')
			.type(1)
			.should('have.value', 1);
		cy.get('input[id = "inter_minutes"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'Free International Minutes')
			.type(1).should('have.value', 1);
		cy.get('input[id = "sms_pack"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'Free SMS Pack')
			.type(1)
			.should('have.value', 1);
		cy.get('input[id = "minutes_charges"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'Local Per Minutes Charges')
			.type(1)
			.should('have.value', 1);
		cy.get('input[id = "inter_charges"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'Inter. Per Minutes Charges')
			.type(1)
			.should('have.value', 1);
		cy.get('input[id = "sms_charges"]')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'SMS Per Charges')
			.type(1)
			.should('have.value', 1);

		cy.get('input[name = "submit"]')
			.should('be.visible')
			.and('have.css', 'background-color', 'rgb(246, 117, 94)')
			.and('have.css', 'border-radius', '4px')
			.and('have.css', 'color', 'rgb(255, 255, 255)')
			.and('have.css', 'display', 'inline-block')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'height', '49px')
			.and('have.css', 'line-height', '49px')
			.and('have.css', 'padding', '0px 49px')
			.and('have.css', 'text-align', 'center')
			// .and('have.css', 'text-decoration', 'none')
			.and('have.css', 'white-space', 'nowrap')
			.and('have.css', 'text-transform', 'uppercase')
			.click()
		cy.url()
			.should('be.equal', 'https://demo.guru99.com/telecom/addtariffplans.php');
		cy.get('#main')
			.should('contain', 'Congratulation you add Tariff Plan')
		});


	it('Reset button test', () => {
		cy.log('positive check');
		cy.visit('https://demo.guru99.com/telecom/addtariffplans.php');
		cy.get('input[id = "rental1"]')
			.type(99999)
			.should('have.value', 99999);
		cy.get('input[id = "local_minutes"]')
			.type(99999)
			.should('have.value', 99999);
		cy.get('input[id = "inter_minutes"]')
			.type(99999)
			.should('have.value', 99999);
		cy.get('input[id = "sms_pack"]')
			.type(99999)
			.should('have.value', 99999);
		cy.get('input[id = "minutes_charges"]')
			.type(999)
			.should('have.value', 999);
		cy.get('input[id = "inter_charges"]')
			.type(999)
			.should('have.value', 999);
		cy.get('input[id = "sms_charges"]')
			.type(999)
			.should('have.value', 999);
			
		cy.get('[type="reset"]')
			.should('be.visible')
			.and('have.value', 'Reset')
			.and('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
			.and('have.css', 'color', 'rgb(114, 122, 130)')
			.and('have.css', 'border-radius', '4px')
			.and('have.css', 'color', 'rgb(114, 122, 130)')
			.and('have.css', 'display', 'inline-block')
			.and('have.css', 'font-family', 'Montserrat, sans-serif')
			.and('have.css', 'height', '49px')
			.click();

		console.log('check the alert called with message')
		const stub = cy.stub();  
		cy.on ('window:alert', stub);		
		cy.get('input[name = "submit"]')
			.click()
	    	.then(() => {
	    		expect(stub).to.be.called;
		     	expect(stub.getCall(0)).to.be.calledWith('please fill all fields Correct Value')      
		    	// Error, allert will never be called
		    })  
	});
})
