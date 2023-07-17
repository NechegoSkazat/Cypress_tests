Cypress.config('defaultCommandTimeout', 100000);

describe('Guru99 login page', () =>{
	it('Checking navigation elements', () => {
		cy.log('Checking navigation elements');
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/index.php',);

		cy.getNavigationElement('Agile Project', 
			'https://demo.guru99.com/Agile_Project/Agi_V1/');
		cy.getNavigationElement('Bank Project', 
			'https://demo.guru99.com/V1/index.php');	
		cy.getNavigationElement('Security Project', 
			'https://demo.guru99.com/Security/SEC_V1/index.php');	
		cy.getNavigationElement('Telecom Project', 
			'https://demo.guru99.com/telecom/index.html');	
		cy.getNavigationElement('Payment Gateway Project', 
			'https://demo.guru99.com/payment-gateway/index.php');	
		cy.getNavigationElement('New Tours', 
			'https://demo.guru99.com/test/newtours/');	

		cy.log('Checking Selenium dropdowns');				
		cy.getDropdownElement('Selenium ', 'Table Demo', 
			'https://demo.guru99.com/test/table.html');
		cy.getDropdownElement('Selenium ', 'Radio & Checkbox Demo', 
			'https://demo.guru99.com/test/radio.html')
		cy.getDropdownElement('Selenium ', 'Accessing Link', 
			'https://demo.guru99.com/test/link.html')
		cy.getDropdownElement('Selenium ', 'Ajax Demo', 
			'https://demo.guru99.com/test/ajax.html')
		cy.getDropdownElement('Selenium ', 'Inside & Outside Block Level Tag', 
			'https://demo.guru99.com/test/block.html')
		cy.getDropdownElement('Selenium ', 'Delete Customer Form', 
			'https://demo.guru99.com/test/delete_customer.php')
		cy.getDropdownElement('Selenium ', 'Yahoo', 
			'https://demo.guru99.com/test/yahoo.html')
		cy.getDropdownElement('Selenium ', 'Tooltip', 
			'https://demo.guru99.com/test/tooltip.html')
		cy.getDropdownElement('Selenium ', 'File Upload', 
			'https://demo.guru99.com/test/upload/')
		cy.getDropdownElement('Selenium ', 'Login', 
			'https://demo.guru99.com/test/login.html')
		cy.getDropdownElement('Selenium ', 'Social Icon', 
			'https://demo.guru99.com/test/social-icon.html')
		cy.getDropdownElement('Selenium ', 'Selenium Auto IT', 
			'https://demo.guru99.com/test/autoit.html')
		cy.getDropdownElement('Selenium ', 'Selenium IDE Test', 
			'https://demo.guru99.com/test/facebook.html')
		cy.getDropdownElement('Selenium ', 'Guru99 Demo Page', 
			'https://demo.guru99.com/test/guru99home/')
		cy.getDropdownElement('Selenium ', 'Scrollbar Demo', 
			'https://demo.guru99.com/test/guru99home/scrolling.html')
		cy.getDropdownElement('Selenium ', 'File Upload using Sikuli Demo', 
			'https://demo.guru99.com/test/image_upload/')
		cy.getDropdownElement('Selenium ', 'Cookie Handling Demo', 
			'https://demo.guru99.com/test/cookie/selenium_aut.php')
		cy.getDropdownElement('Selenium ', 'Drag and Drop Action', 
			'https://demo.guru99.com/test/drag_drop.html')
		cy.getDropdownElement('Selenium ', 'Selenium DatePicker Demo', 
			'https://demo.guru99.com/test/')


		cy.log('Checking SEO dropdowns');
		cy.getDropdownElement('SEO', 'Page-1', 
			'https://demo.guru99.com/seo/page-1.html')
		cy.getDropdownElement('SEO', 'Page-2', 
			'https://demo.guru99.com/seo/page-2.html')
		cy.getDropdownElement('SEO', 'Page-3', 
			'https://demo.guru99.com/seo/page-3.html')
		cy.getDropdownElement('SEO', 'Page-4', 
			'https://demo.guru99.com/seo/page-4.html')
		cy.getDropdownElement('SEO', 'Page-5', 
			'https://demo.guru99.com/seo/page-5.html')
		cy.getDropdownElement('SEO', 'Page-6', 
			'https://demo.guru99.com/seo/page-6.html')
		
	});
	
	it('Checking header elements', () => {
		cy.log('Checking navigation dropdowns');
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/index.php',);

		cy.log('Check Guru99 logo')
		cy.get('[class="logo"]')
			.then(jqElement =>{
				cy.contains('a', 'Demo Site')
					.should('be.visible')
					.click();
				cy.url()
					.should('eq', 'https://www.guru99.com/');
				cy.go('back')
			});
		cy.log('Check Guru99 img')
		cy.get('[class="logo"]')
			.find('img')
			.should('be.visible')
			.click();
		cy.url()
			.should('eq', 'https://www.guru99.com/');
		cy.go('back');
		
		cy.getHeaderElement('Testing', 'https://www.guru99.com/software-testing.html');
		cy.getHeaderElement('Selenium', 'https://www.guru99.com/selenium-tutorial.html');
		cy.getHeaderElement('Live Project', 'https://www.guru99.com/live-projects.html');
		cy.getHeaderElement('Java', 'https://www.guru99.com/java-tutorial.html');
		
	});


	it('Checking login page elements', () => {
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/index.php');
		cy.log('check Guru99 Bank header')
		cy.get('h2')
			.should('contain', 'Guru99 Bank')
			.should('be.visible')
			.should('have.css', 'font-size', '27px')
			.should('have.css', 'font-weight', '700')
			.should('have.css', 'padding', '10px');
		cy.get('tr')
			.should('contain', 'UserID')
			.find('input[name="uid"]')
			.should('exist')
		cy.get('tr')
			.should('contain', 'Password')
			.find('input[name="password"]')
			.should('exist');
		cy.get('h4')
			.should('contain', 'Access')
			.and('be.visible')
			.and('have.css', 'font-size', '18px')
			.and('have.css', 'font-weight', '700')
			.and('have.css', 'padding', '10px');
		cy.get('body')
			.should('contain', 'UserID : 1303')
			.should('be.visible');
		cy.get('body')
			.should('contain', 'Password : Guru99')
			.should('be.visible');

	});


	it('Valid login test', () => {
		cy.log('Login GURU99 page');
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/index.php');
		cy.get('input[name="uid"]')
			.should('be.visible')
			.and('have.css', 'border', '1.6px solid rgb(128, 128, 128)')
			.and('have.css', 'border-color', 'rgb(128, 128, 128)')
			.and('have.css', 'border-radius', '10px')
			.and('have.css', 'FONT-FAMILY', 'Tahoma, sans-serif, Verdana')
			.and('have.css', 'FONT-SIZE', '16px')
			.and('have.css', 'background-color', 'rgb(248, 248, 255)')
			.type('1303');

		cy.get('input[name="password"]')
			.should('be.visible')
			.and('have.css', 'border', '1.6px solid rgb(128, 128, 128)')
			.and('have.css', 'border-color', 'rgb(128, 128, 128)')
			.and('have.css', 'border-radius', '10px')
			.and('have.css', 'FONT-FAMILY', 'Tahoma, sans-serif, Verdana')
			.and('have.css', 'FONT-SIZE', '16px')
			.and('have.css', 'background-color', 'rgb(248, 248, 255)')
			.type('Guru99');	

		cy.get('[name="btnLogin"]')
			.should('be.visible')
			.and('have.value', 'LOGIN')
			.and('have.css', 'border', '1.6px solid rgb(128, 128, 128)')
			.and('have.css', 'border-color', 'rgb(128, 128, 128)')
			.and('have.css', 'border-radius', '10px')
			.and('have.css', 'FONT-FAMILY', 'Tahoma, sans-serif, Verdana')
			.and('have.css', 'FONT-SIZE', '16px')
			.and('have.css', 'background-color', 'rgb(248, 248, 255)')
			.click();

		cy.url()
			.should('be.equal', 'https://demo.guru99.com/Agile_Project/Agi_V1/customer/Customerhomepage.php');		
		cy.get('[href="Logout.php"]')
			.click();
		cy.url()
			.should('be.equal', 'https://demo.guru99.com/Agile_Project/Agi_V1/index.php');				
		});


	it('Reset button test', () => {
		cy.log('Login GURU99 page');
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/index.php');
		cy.get('input[name="uid"]')
			.should('be.visible')
			.type('1303');
		cy.get('input[name="password"]')
			.type('Guru99');		
		cy.get('[name="btnReset"]')
			.and('have.css', 'border', '1.6px solid rgb(128, 128, 128)')
			.and('have.css', 'border-color', 'rgb(128, 128, 128)')
			.and('have.css', 'border-radius', '10px')
			.and('have.css', 'FONT-FAMILY', 'Tahoma, sans-serif, Verdana')
			.and('have.css', 'FONT-SIZE', '16px')
			.and('have.css', 'background-color', 'rgb(248, 248, 255)')
			.click()
		cy.get('input[name="uid"]')
			.should('have.value', '');
		cy.get('input[name="password"]')
			.should('have.value', '');	
		const stub = cy.stub(); 
      	cy.on ('window:alert', stub);
		cy.get('[name="btnLogin"]')
			.click()
			.then(() => {
				cy.on('window:alert', (text) => {
					expect(stub).to.be.called
		      		expect(stub.getCall(0)).to.be.calledWith('User or Password is not valid');
		      	});		
			});
	});
})