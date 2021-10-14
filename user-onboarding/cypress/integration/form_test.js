
describe('[ FORM APP TESTING ]', () => {

    // Refresh the browser before every test to clear state
    beforeEach( () => {
        cy.visit('http://localhost:3000');
    })

    // Getters - create references to input fields
    const fName = () => cy.get('input[name=firstName]');
    const lName = () => cy.get('input[name=lastName]');
    const email = () => cy.get('input[name=email]');
    const pwd = () => cy.get('input[name=password]');
    const tos = () => cy.get('input[name=tos]');
    const submitBtn = () => cy.get(`button[id='submitBtn']`); // Can you use Type?


    describe('1. Validate input fields are visible', () => {
        // Check that elements exist and references above work
        it('Validate the proper elements are showing', () => {
            fName().should('exist');
            lName().should('exist');
            email().should('exist');
            pwd().should('exist');
            tos().should('exist');
            submitBtn().should('exist');
        })
    })


    describe ('2. Validate input fields are empty and accept values', () => {
        // Get the Name input and type a name in it.
        // Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
        // Get the Email input and type an email address in it
        // Get the password input and type a password in it
        // Set up a test that will check to see if a user can check the terms of service box
        it('Get first name and enter text in it', () => {
            fName()
                .should('have.value','')
                .type('Sean')
                .should('have.value','Sean')
            lName()
                .should('have.value','')
                .type('Terry')
                .should('have.value','Terry')
            email()
                .should('have.value','')
                .type('st@email.com')
                .should('have.value','st@email.com')
            pwd()
                .should('have.value','')
                .type('12345')
                .should('have.value','12345')
            tos()
                .should('not.be.checked')
                .check()
                .should('be.checked')
        })
    }) // End test case 4
    

    describe ('3. Validate user can submit the completed form data', () => {
        
        it('Use information is posted to the DOM after submit', () => {
            
            // Enter values in all fields + submit
            fName().type('Sean')
            lName().type('Terry')
            email().type('st@email.com')
            pwd().type('12345')
            tos().check()
            submitBtn().click();

            // Entry is contained in DOM
            cy.contains(/Sean Terry/i)
 
        })
    }) // End test case 3

    
    //Check for form validation if an input is left empty
    describe ('4. Validate that submit button is disabled', () => {
        
        it('First name field missing', () => {
            // fName().type('Sean')
            lName().type('Terry')
            email().type('st@email.com')
            pwd().type('12345')
            tos().check()
            submitBtn().should('be.disabled');
        })
        it('Last name field missing', () => {
            fName().type('Sean')
            // lName().type('Terry')
            email().type('st@email.com')
            pwd().type('12345')
            tos().check()
            submitBtn().should('be.disabled');
        })
        it('Email field missing', () => {
            fName().type('Sean')
            lName().type('Terry')
            // email().type('st@email.com')
            pwd().type('12345')
            tos().check()
            submitBtn().should('be.disabled');
        })
        it('Password field missing', () => {
            fName().type('Sean')
            lName().type('Terry')
            email().type('st@email.com')
            // pwd().type('12345')
            tos().check()
            submitBtn().should('be.disabled');
        })
        it('TOS not checked', () => {
            fName().type('Sean')
            lName().type('Terry')
            email().type('st@email.com')
            pwd().type('12345')
            // tos().check()
            submitBtn().should('be.disabled');
        })
    }) // End test case 4

}) // End of Form App Testing