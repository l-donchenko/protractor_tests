'use strict';

var RegisterPage = require("../pages/register.page.js");
var MainPage = require("../pages/main.page.js");
var Common = require("../commons/common.js");
var WelcomeWizadrHelper = require("../commons/welcomeWizard.helper.js");

var common = new Common();

/** variables **/
var email = common.email;
var incompleteEmail = "asd";
var password = {
    inclomplete: "asd",
    very_weak: "asdqwe",  //red
    weak: "asdqweAa",       //light orange
    average: "asdqweAa1",    //orange
    strong: "asdqweAa1@"      //green
};
var countryCode = common.countryCode;

describe("Registration page", function(){
	var registerPage, mainPage, welcomeWizard;


	beforeAll(function(){
        welcomeWizard = new WelcomeWizadrHelper();
        mainPage = new MainPage();
		registerPage = new RegisterPage();

        mainPage.go();
        browser.waitForAngular();
        common.logout();

		registerPage.go();
	});

    afterAll(function(){
        welcomeWizard.welcomeWizardWrapper.isDisplayed().then(function() {
            welcomeWizard.tryItBtn.click();
            common.logout();
        }, function() {
            common.logout();
        });
    });

//-- Check if all the described linkages (privacy policy, etc.) are implemented
	it('should display Terms of Use link', function(){
		expect(registerPage.termsOfUseLink.getTagName()).toBe('a');
	});

	it('should display Privacy Policy link', function(){
		expect(registerPage.privacyPolicyLink.getTagName()).toBe('a');
	});

	it('should display Cookies link', function(){
		expect(registerPage.cookiesLink.getTagName()).toBe('a');
	});

//-- Check if there is a error message when entering no or an incomplete Email address
    it('should display correct error message when entering no email address', function(){
        common.setField(registerPage.emailField, "");
        registerPage.emailField.click();
        registerPage.emailPopover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email")).toBe(true);
        });
    });

    it('should display correct error message when entering incomplete email address', function(){
        common.setField(registerPage.emailField, incompleteEmail);
        registerPage.emailField.click();
        registerPage.emailPopover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email")).toBe(true);
        });
    });

    it('should display red hint in popover when entering no email address', function(){
        common.setField(registerPage.emailField, "");
        registerPage.emailField.click();
        expect(registerPage.isHintClassCorrect(1, "text-danger", "email")).toBe(true);
    });

    it('should display error icon when entering incomplete email address', function(){
        common.setField(registerPage.emailField, incompleteEmail);
        registerPage.emailField.click();
        expect(registerPage.isIconCorrect(registerPage.emailField, "x")).toBe(true);
    });

//-- Check if there is a 'correct' message when entering a valid Email address
    it('should display correct error message when entering complete email address', function(){
        common.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        registerPage.emailPopover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email")).toBe(true);
        });
    });

    it('should display correct error message when entering complete email address', function(){
        common.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        registerPage.emailPopover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email")).toBe(true);
        });
    });

    it('should display red hint in popover when entering complete email address', function(){
        common.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isHintClassCorrect(1, "text-success", "email")).toBe(true);
    });

    it('should display tick icon when entering complete email address', function(){
        common.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        expect(registerPage.isIconCorrect(registerPage.emailField, "tick")).toBe(true);
    });

//-- Check if there is a error message when entering no or an incomplete Email address the second time
    //TODO popover sholud be visible ONLY when first email is corrected
    it('should display correct error message when entering no email address the second time', function(){
        common.setField(registerPage.emailField, email);
        registerPage.emailField.click();
        common.setField(registerPage.emailRepeatField, "");
        registerPage.emailRepeatField.click();
        registerPage.email2Popover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email2")).toBe(true);
        });
     });

    it('should display correct error message when entering incomplete email address the second time', function(){
        common.setField(registerPage.emailRepeatField, incompleteEmail);
        registerPage.emailRepeatField.click();
        registerPage.email2Popover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email2")).toBe(true);
        });
    });

    it('should display red hint in popover when entering no email address the second time', function(){
        common.setField(registerPage.emailRepeatField, "");
        registerPage.emailRepeatField.click();
        expect(registerPage.isHintClassCorrect(1, "text-danger", "email2")).toBe(true);
    });

    it('should display error icon when entering incomplete email address the second time', function(){
        common.setField(registerPage.emailRepeatField, incompleteEmail);
        registerPage.emailRepeatField.click();
        expect(registerPage.isIconCorrect(registerPage.emailRepeatField, "tick")).toBe(true);
    });

//-- Check if there is a 'correct' message when entering a valid Email address the second time
    it('should display correct error message when entering complete email address the second time', function(){
        common.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isPopoverCorrect("email2")).toBe(true);
    });

    it('should display correct error message when entering complete email address the second time', function(){
        common.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        registerPage.email2Popover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("email2")).toBe(true);
        });
    });

    it('should display red hint in popover when entering complete email address the second time', function(){
        common.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isHintClassCorrect(1, "text-success", "email2")).toBe(true);
    });

    it('should display tick icon when entering complete email address the second time', function(){
        common.setField(registerPage.emailRepeatField, email);
        registerPage.emailRepeatField.click();
        expect(registerPage.isIconCorrect(registerPage.emailRepeatField, "tick")).toBe(true);
    });

//-- Check if there is a 'How strong is your password'-note after entering six letters/numbers/etc. in the password field
    it('should display correct error message when start to enter a password', function(){
        common.setField(registerPage.passwordField, password.inclomplete);
        registerPage.passwordField.click();
        registerPage.passwordPopover.isDisplayed().then(function() {
            expect(registerPage.isPopoverCorrect("password")).toBe(true);
        });
    });

    /**
     * hints for password should be (min. 6 chars / max. 64 chars):
     *  - red / green   if password length is less than 6
     *  - green / green if password length is between 6 - 64
     *  - green / red   if password length is more than 64
     */

    it('should display correct hints when password is shorter than 6 characters', function(){
        common.setField(registerPage.passwordField, password.inclomplete);
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-danger", "password")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success", "password")).toBe(true);

        common.setField(registerPage.passwordField, registerPage.getRandomPassword(5));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-danger", "password")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success", "password")).toBe(true);
    });

    it('should display correct hints when password length is between 6 - 64 characters', function(){
        common.setField(registerPage.passwordField, registerPage.getRandomPassword(6));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success", "password")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success", "password")).toBe(true);

        common.setField(registerPage.passwordField, registerPage.getRandomPassword(63));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success", "password")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-success", "password")).toBe(true);
    });

    it('should display correct hints when password is longer than 64 characters', function(){
        common.setField(registerPage.passwordField, registerPage.getRandomPassword(66));
        registerPage.passwordField.click();

        expect(registerPage.isHintClassCorrect(1, "text-success", "password")).toBe(true);
        expect(registerPage.isHintClassCorrect(2, "text-danger", "password")).toBe(true);

    });

//-- Check if there is a 'How strong is your password' note after entering six letters/numbers/etc. in the password field
    it('should display "How strong is your password" note after entering six characters', function(){
        common.setField(registerPage.passwordField, registerPage.getRandomPassword(6));
        registerPage.passwordField.click();

        expect(registerPage.popover["password"].passwordHint.isDisplayed()).toBe(true);
    });

    it('should display correct hint "How strong is your password" if very weak password provided', function(){
        common.setField(registerPage.passwordField, password.very_weak);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('very_weak')).toBe(true);
    });

    it('should display correct hint "How strong is your password" if weak password provided', function(){
        common.setField(registerPage.passwordField, password.weak);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('weak')).toBe(true);
    });

    it('should display correct hint "How strong is your password" if average password provided', function(){
        common.setField(registerPage.passwordField, password.average);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('average')).toBe(true);
    });

    it('should display correct hint "How strong is your password" if strong password provided', function(){
        common.setField(registerPage.passwordField, password.strong);
        registerPage.passwordField.click();

        expect(registerPage.isStrongPasswordHintCorrect('strong')).toBe(true);
    });

//-- Check if the 'Register now' button leads you to a logged in page
    it('should keep "Register" button disabled until all required field are fill in', function(){
        registerPage.fillInRegisterFields("", "", "", "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);

        registerPage.fillInRegisterFields(email, "", "", "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);

        registerPage.fillInRegisterFields("", email, "", "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);

        registerPage.fillInRegisterFields("", "", password.inclomplete, "");
        expect(registerPage.registerButton.isEnabled()).toBe(false);
    });

    it('should enable "Register" button if all required fields are fill in', function(){
        registerPage.fillInRegisterFields(email, email, password.average, countryCode);
        expect(registerPage.registerButton.isEnabled()).toBe(true);
    });

//--  Check if the 'Register now' button leads you to a logged in page
    it('should redirect to a logged in page after registration', function(){
        //TODO handle redirect
        registerPage.fillInRegisterFields(email, email, password.average, countryCode);
        registerPage.registerButton.isEnabled().then(function(){
            registerPage.registerButton.click();
            browser.waitForAngular();
            common.errorBlock.isDisplayed().then(function() {
                console.log("error occured");
            }, function(){
                browser.sleep(2000);
                expect(browser.getCurrentUrl()).toEqual(browser.params.MAIN_URL_DEV + "/");
                browser.sleep(2000);
                welcomeWizard.tryItBtn.click();
                browser.sleep(2000);
            });

        });

    });

});