//sets up all variables
var maskedLoginPassword = ""; //stores actual password rather than masked
var maskedRegPassword = "";
var maskedRegConfirmPassword = "";
var maskedNewPassword = "";
var maskedConfirmNewPassword = "";
var maskedCurrentPassword = "";
var maskedNewPassword2 = "";
var maskedConfirmNewPassword2 = "";

var loggedInAccountType = ""; 

var baristaOrders = [];

var loggedInEmail = "";
var previousMenu = "";
var loggedInName = "";

var selectedRating = 0;


var basket = []; // holds all the drinks user adds

onEvent("Welcome", "click", function() { //takes user to login screen
  setScreen("Login");
});

onEvent("loginPasswordInput", "input", function() {
  // get the text
  var current = getText("loginPasswordInput");

  // make sure it exists
  if (typeof maskedLoginPassword !== "string") {
    maskedLoginPassword = "";
  }

  // handles adding or deleting characters
  if (current.length < maskedLoginPassword.length) {
    maskedLoginPassword = maskedLoginPassword.slice(0, current.length);
  } else {
    maskedLoginPassword += current.slice(maskedLoginPassword.length);
  }

  // show masked version
  var maskedText = "";
  for (var i = 0; i < maskedLoginPassword.length; i++) {
    maskedText += "*";
  }

  // set the input box to show asterisks
  setText("loginPasswordInput", maskedText);
});

// masks the password while typing during account creation
onEvent("regPasswordInput", "input", function() {
  var current = getText("regPasswordInput");
  if (typeof maskedRegPassword !== "string") maskedRegPassword = "";

  if (current.length < maskedRegPassword.length) {
    maskedRegPassword = maskedRegPassword.slice(0, current.length);
  } else {
    maskedRegPassword += current.slice(maskedRegPassword.length);
  }

  var maskedText = "";
  for (var i = 0; i < maskedRegPassword.length; i++) {
    maskedText += "*";
  }
  setText("regPasswordInput", maskedText);
});

// masks the confirm password input during account creation
onEvent("regConfirmPasswordInput", "input", function() {
  var current = getText("regConfirmPasswordInput");
  if (typeof maskedRegConfirmPassword !== "string") maskedRegConfirmPassword = "";

  if (current.length < maskedRegConfirmPassword.length) {
    maskedRegConfirmPassword = maskedRegConfirmPassword.slice(0, current.length);
  } else {
    maskedRegConfirmPassword += current.slice(maskedRegConfirmPassword.length);
  }

  var maskedText = "";
  for (var i = 0; i < maskedRegConfirmPassword.length; i++) {
    maskedText += "*";
  }
  setText("regConfirmPasswordInput", maskedText);
});

// masks the new password input on forgot password screen
onEvent("newPasswordInput", "input", function() {
  var current = getText("newPasswordInput");
  if (typeof maskedNewPassword !== "string") maskedNewPassword = "";

  if (current.length < maskedNewPassword.length) {
    maskedNewPassword = maskedNewPassword.slice(0, current.length);
  } else {
    maskedNewPassword += current.slice(maskedNewPassword.length);
  }

  var maskedText = "";
  for (var i = 0; i < maskedNewPassword.length; i++) {
    maskedText += "*";
  }

  setText("newPasswordInput", maskedText);
});

// masks the confirm new password input on forgot password screen
onEvent("confirmNewPasswordInput", "input", function() {
  var current = getText("confirmNewPasswordInput");
  if (typeof maskedConfirmNewPassword !== "string") maskedConfirmNewPassword = "";

  if (current.length < maskedConfirmNewPassword.length) {
    maskedConfirmNewPassword = maskedConfirmNewPassword.slice(0, current.length);
  } else {
    maskedConfirmNewPassword += current.slice(maskedConfirmNewPassword.length);
  }

  var maskedText = "";
  for (var i = 0; i < maskedConfirmNewPassword.length; i++) {
    maskedText += "*";
  }

  setText("confirmNewPasswordInput", maskedText);
});

// masks the current password when user changes their password
onEvent("currentPasswordInput", "input", function() {
  var current = getText("currentPasswordInput");
  if (maskedCurrentPassword === undefined || typeof maskedCurrentPassword !== "string") {
    maskedCurrentPassword = "";
  }

  if (current.length < maskedCurrentPassword.length) {
    maskedCurrentPassword = maskedCurrentPassword.slice(0, current.length);
  } else {
    maskedCurrentPassword += current.slice(maskedCurrentPassword.length);
  }

  var masked = "";
  for (var i = 0; i < maskedCurrentPassword.length; i++) {
    masked += "*";
  }

  setText("currentPasswordInput", masked);
});

// masks the new password when user changes their password
onEvent("newPasswordInput2", "input", function() {
  var current = getText("newPasswordInput2");

  if (maskedNewPassword2 === undefined || typeof maskedNewPassword2 !== "string") {
    maskedNewPassword2 = "";
  }

  if (current.length < maskedNewPassword2.length) {
    maskedNewPassword2 = maskedNewPassword2.slice(0, current.length);
  } else {
    maskedNewPassword2 += current.slice(maskedNewPassword2.length);
  }

  var masked = "";
  for (var i = 0; i < maskedNewPassword2.length; i++) {
    masked += "*";
  }

  setText("newPasswordInput2", masked);
});

// masks the confirm new password when user changes their password
onEvent("confirmNewPasswordInput2", "input", function() {
  var current = getText("confirmNewPasswordInput2");

  if (maskedConfirmNewPassword2 === undefined || typeof maskedConfirmNewPassword2 !== "string") {
    maskedConfirmNewPassword2 = "";
  }

  if (current.length < maskedConfirmNewPassword2.length) {
    maskedConfirmNewPassword2 = maskedConfirmNewPassword2.slice(0, current.length);
  } else {
    maskedConfirmNewPassword2 += current.slice(maskedConfirmNewPassword2.length);
  }

  var masked = "";
  for (var i = 0; i < maskedConfirmNewPassword2.length; i++) {
    masked += "*";
  }

  setText("confirmNewPasswordInput2", masked);
});


// when user clicks create account, go to registration screen
onEvent("createAccountButton", "click", function( ) {
  setScreen("Registration");
});

// when user clicks forgot password, go to forgot password screen
onEvent("forgotPasswordButton", "click", function( ) {
  setScreen("ForgotPassword");
});

// when user submits registration form
onEvent("registerSubmitButton", "click", function( ) {
  var name = getText("regFullNameInput");
  var email = getText("regEmailInput");
  var password = maskedRegPassword;
  var confirmPassword = maskedRegConfirmPassword;
  var securityQuestion = getText("regSecurityDropdown");
  var securityAnswer = getText("regSecurityAnswerInput");

  // check which account type is selected
  var accountType = getChecked("customerRadio") ? "Customer" : "Barista";

  // email format checker
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // if any field is empty, show that error
  if (name === "" || email === "" || password === "" || confirmPassword === "" || securityAnswer === "") {
    setProperty("emptyFieldsLabel", "hidden", false);
    setProperty("passwordMismatchLabel", "hidden", true);
    setProperty("invalidEmailLabel", "hidden", true);
    setProperty("emailInUseLabel", "hidden", true);
    return;
  }

  // if passwords don't match, show that error
  else if (password !== confirmPassword) {
    setProperty("passwordMismatchLabel", "hidden", false);
    setProperty("emptyFieldsLabel", "hidden", true);
    setProperty("invalidEmailLabel", "hidden", true);
    setProperty("emailInUseLabel", "hidden", true);
    return;
  }

  // if email isn't valid, show that error
  else if (!emailRegex.test(email)) {
    setProperty("invalidEmailLabel", "hidden", false);
    setProperty("emptyFieldsLabel", "hidden", true);
    setProperty("passwordMismatchLabel", "hidden", true);
    setProperty("emailInUseLabel", "hidden", true);
    return;
  }

  // check if email already exists in the database
  getKeyValue(email, function(value) {

    // if email doesn't exist, create account
    if (value === null || value === "null" || value === "" || value === undefined || value === "undefined") {
      var userData = {
        name: name,
        password: password,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
        accountType: accountType
      };

      // save the account
      setKeyValue(email, JSON.stringify(userData), function() {

        // reset all registration inputs
        setText("regFullNameInput", "");
        setText("regEmailInput", "");
        setText("regPasswordInput", "");
        setText("regConfirmPasswordInput", "");
        setText("regSecurityAnswerInput", "");
        setText("regSecurityDropdown", "");

        // reset stored password variables
        maskedRegPassword = "";
        maskedRegConfirmPassword = "";

        // reset radio buttons
        setProperty("customerRadio", "checked", true);
        setProperty("baristaRadio", "checked", false);

        // go to login screen
        setScreen("Login");
      });

    } else {
      // if email already exists, show that error
      setProperty("emailInUseLabel", "hidden", false);
      setProperty("invalidEmailLabel", "hidden", true);
      setProperty("emptyFieldsLabel", "hidden", true);
      setProperty("passwordMismatchLabel", "hidden", true);
    }
  });
});

//go back to login
onEvent("backToLoginButton", "click", function( ) {
	setScreen("Login");
});

// when user clicks login
onEvent("loginButton", "click", function() {
  var email = getText("loginEmailInput").toLowerCase(); // turn email lowercase
  var password = maskedLoginPassword; // use the actual password (not masked)

  // check if email exists in database
  getKeyValue(email, function(value) {
    if (value === null || value === "" || value === "undefined" || value === undefined) {
      // if no user found, show error
      setProperty("loginErrorLabel", "hidden", false);
    } else {
      var userData = JSON.parse(value);

      // if password is correct
      if (userData.password === password) {
        loggedInEmail = email;
        loggedInName = userData.name;
        loggedInAccountType = userData.accountType;
        maskedLoginPassword = "";

        // check if account is barista or customer
        if (userData.accountType === "Barista") {
          setScreen("BaristaHome");
          updateBaristaOrders();
        } else {
          setScreen("CoffeeMenu");
        }
      } else {
        // if password is wrong, show error
        setProperty("loginErrorLabel", "hidden", false);
      }
    }
  });
});

// when user types email on forgot password screen
onEvent("forgotEmailInput", "change", function () {
  var email = getText("forgotEmailInput").toLowerCase();

  getKeyValue(email, function (value) {
    if (value === null || value === "null") {
      console.log("email not found in database");
      return;
    }

    var user = JSON.parse(value);
    var question = user.securityQuestion.toLowerCase().trim();

    // hide all security questions first
    setProperty("securityQ1Label", "hidden", true);
    setProperty("securityQ2Label", "hidden", true);
    setProperty("securityQ3Label", "hidden", true);
    setProperty("securityQ4Label", "hidden", true);
    setProperty("securityQ5Label", "hidden", true);

    // show the right question depending on user data
    if (question.includes("first pet")) {
      setProperty("securityQ1Label", "hidden", false);
    } else if (question.includes("maiden name")) {
      setProperty("securityQ2Label", "hidden", false);
    } else if (question.includes("holiday destination")) {
      setProperty("securityQ3Label", "hidden", false);
    } else if (question.includes("childhood best friend")) {
      setProperty("securityQ4Label", "hidden", false);
    } else if (question.includes("first school")) {
      setProperty("securityQ5Label", "hidden", false);
    } else {
      console.log("security question not recognized");
    }

    // show the answer input box
    setProperty("forgotAnswerInput", "hidden", false);
  });
});

// back to login screen from forgot password screen
onEvent("backToLoginButton2", "click", function( ) {
  setScreen("Login");
});

// when user types answer to the security question
onEvent("forgotAnswerInput", "change", function() {
  var email = getText("forgotEmailInput").toLowerCase();
  var answer = getText("forgotAnswerInput").trim();

  getKeyValue(email, function(value) {
    if (value !== null && value !== "null") {
      var user = JSON.parse(value);

      // if answer is correct, show reset fields
      if (answer.toLowerCase() === user.securityAnswer.toLowerCase()) {
        setProperty("newPasswordInput", "hidden", false);
        setProperty("confirmNewPasswordInput", "hidden", false);
        setProperty("resetPasswordButton", "hidden", false);
      }
    }
  });
});

// when user confirms new password
onEvent("resetPasswordButton", "click", function() {
  var newPassword = maskedNewPassword;
  var confirmPassword = maskedConfirmNewPassword;
  var email = getText("forgotEmailInput").toLowerCase();

  // check if passwords match
  if (newPassword !== confirmPassword) {
    setProperty("passwordMismatchLabel2", "hidden", false);
    return;
  }

  // update password in database
  getKeyValue(email, function(value) {
    if (value !== null && value !== "null") {
      var user = JSON.parse(value);
      user.password = newPassword;

      setKeyValue(email, JSON.stringify(user), function() {
        setScreen("Login");
      });
    }
  });
});

// switch to coffee menu screen
onEvent("coffeeButton2", "click", function() {
  setScreen("CoffeeMenu");
});

// switch to other drinks menu screen
onEvent("otherDrinksButton1", "click", function(){
  setScreen("OtherMenu");
});


onEvent("profileButton1", "click", function() {
  getKeyValue(loggedInEmail, function(value) {
    if (value !== null && value !== "null") {
      var user = JSON.parse(value);
      setText("profileNameLabel", user.name);
      setText("profileEmailLabel", loggedInEmail);
    }
  });
  setScreen("Profile"); // your profile screen name
});
onEvent("profileButton2", "click", function() {
  getKeyValue(loggedInEmail, function(value) {
    if (value !== null && value !== "null") {
      var user = JSON.parse(value);
      setText("profileNameLabel", user.name);
      setText("profileEmailLabel", loggedInEmail);
    }
  });
  setScreen("Profile"); // your profile screen name
});

onEvent("backToMenuButton", "click", function(){
setScreen("CoffeeMenu");
});

onEvent("logoutButton", "click", function() {
  loggedInEmail = ""; // clear the session
  setText("loginEmailInput", "");       // clears the email input
  setText("loginPasswordInput", "");    // clears the masked password field
  maskedLoginPassword = "";             // clears the stored actual password

  setScreen("Login"); // go back to login screen
});

onEvent("changePasswordButton", "click", function(){
setScreen("ChangePassword");
});

onEvent("backToProfileButton", "click", function() {
  if (loggedInAccountType.toLowerCase() === "barista") {
    setScreen("BaristaProfile");
  } else {
    setScreen("Profile");
  }
});



onEvent("logo", "click", function() {
  setScreen("CoffeeMenu");
});

// when user clicks the Confirm button on the Change Password screen
onEvent("confirmPasswordChangeButton", "click", function() {
  var currentPassword = maskedCurrentPassword;
  var newPassword = maskedNewPassword2;
  var confirmPassword = maskedConfirmNewPassword2;
  var email = loggedInEmail.toLowerCase();

  // hide all labels
  setProperty("changePasswordFillLabel", "hidden", true);
  setProperty("changePasswordIncorrectLabel", "hidden", true);
  setProperty("changePasswordMismatchLabel", "hidden", true);
  setProperty("changePasswordSameLabel", "hidden", true);
  setProperty("changePasswordSuccessLabel", "hidden", true);

  // check if any fields are empty
  if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
    setProperty("changePasswordFillLabel", "hidden", false);
    return;
  }

  getKeyValue(email, function(value) {
    if (value !== null && value !== "null") {
      var user = JSON.parse(value);

      if (currentPassword !== user.password) {
        setProperty("changePasswordIncorrectLabel", "hidden", false);
      } else if (newPassword !== confirmPassword) {
        setProperty("changePasswordMismatchLabel", "hidden", false);
      } else if (newPassword === currentPassword) {
        setProperty("changePasswordSameLabel", "hidden", false);
      } else {
        user.password = newPassword;
        setKeyValue(email, JSON.stringify(user), function() {
          setProperty("changePasswordSuccessLabel", "hidden", false);
        });
      }
    }
  });
});

function resetCustomisationScreen() {
  // Reset hot/iced radio buttons
  setChecked("hotRadio", true);
  setChecked("icedRadio", false);

  // Reset milk dropdown to default (you can set whatever default you want)
  setText("milkDropdown", "Semi-Skimmed Milk");

  // Uncheck all extras
  setChecked("caramelCheck", false);
  setChecked("vanillaCheck", false);
  setChecked("hazelnutCheck", false);
  setChecked("extraShotCheck", false);
  setChecked("whippedCreamCheck", false);
  setChecked("marshmallowsCheck", false);
  setChecked("decafCheck", false);

  // Clear notes
  setText("notesInput", "");
}


onEvent("backToMenuBtn", "click", function() {
  resetCustomisationScreen();
  setScreen(previousMenu);
});

// All drink buttons → Customisation screen
onEvent("latteBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Latte");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("cappuccinoBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Cappuccino");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("flatWhiteBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Flat White");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("mochaBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Mocha");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("whiteMochaBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "White Mocha");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("cortadoBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Cortado");
  setScreen("Customisation");
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
  // Set to Hot only
  setChecked("hotRadio", true);
  setProperty("icedRadio", "hidden", true);
  setProperty("icedLbl", "hidden", true);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
});


onEvent("espressoBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Espresso");
  setScreen("Customisation");
  setText("dropdownLbl", "Milk Type:");

  // Set milk to "No Milk"
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setProperty("milkDropdown", "options", ["No Milk"]);
  setText("milkDropdown", "No Milk");

  // Set to Hot only
  setChecked("hotRadio", true);
  setProperty("icedRadio", "hidden", true);
  setProperty("icedLbl", "hidden", true);
});



onEvent("americanoBtn", "click", function() {
  previousMenu = "CoffeeMenu";
  setText("drinkName", "Americano");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", false);
  setProperty("extraShotLbl", "hidden", false);
  setText("dropdownLbl", "Milk Type:");

  // Add "No Milk" at the top of existing options
  setProperty("milkDropdown", "options", [
    "No Milk",
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "No Milk");
});

onEvent("matchaBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "Matcha Latte");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("chaiBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "Chai Latte");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("hotChocolateBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "Hot Chocolate");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("whiteHotChocolateBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "White Hot Chocolate");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("teaBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "English Breakfast Tea");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", false);
  setProperty("decafLbl", "hidden", false);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);

  // Add "No Milk" at the top of existing options
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "No Milk",
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("herbalTeaBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "Herbal Tea");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", true);
  setProperty("icedLbl", "hidden", true);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Tea Type:");
  setProperty("milkDropdown", "options", [
    "Peppermint",
    "Lemon & Ginger",
    "Chamomile",
    "Summer Fruits",
    "Green Tea",
    "Darjeeling",
  ]);
  setText("milkDropdown", "Peppermint");
});

onEvent("turmericBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "Turmeric Latte");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});

onEvent("milkBtn", "click", function() {
  previousMenu = "OtherMenu";
  setText("drinkName", "Milk");
  setScreen("Customisation");
  setProperty("icedRadio", "hidden", false);
  setProperty("icedLbl", "hidden", false);
  setProperty("decafCheck", "hidden", true);
  setProperty("decafLbl", "hidden", true);
  setProperty("extraShotCheck", "hidden", true);
  setProperty("extraShotLbl", "hidden", true);
  setText("dropdownLbl", "Milk Type:");
  setProperty("milkDropdown", "options", [
    "Semi-Skimmed Milk",
    "Skimmed Milk",
    "Whole Milk",
    "Oat Milk",
    "Soya Milk",
    "Coconut Milk",
    "Almond Milk"
  ]);
  setText("milkDropdown", "Semi-Skimmed Milk");
});


onEvent("backToMenu", "click", function(){
  setScreen("CoffeeMenu");
});

onEvent("addToOrderButton", "click", function() {
  var drink = {
    name: getText("drinkName"),
    hotOrIced: getChecked("hotRadio") ? "Hot" : (getChecked("icedRadio") ? "Iced" : "None"),
    milk: getText("milkDropdown"),
    extras: getSelectedExtras(),
    notes: getText("notesInput"),
    price: calculateDrinkPrice()
  };

  if (basket.length < 4) {  // Only allow max 4 drinks
    basket.push(drink);
  }

  resetCustomisationScreen();
  setScreen(previousMenu);
});

function getSelectedExtras() {
  var extras = [];
  if (getChecked("caramelCheck")) extras.push("Caramel Syrup");
  if (getChecked("vanillaCheck")) extras.push("Vanilla Syrup");
  if (getChecked("hazelnutCheck")) extras.push("Hazelnut Syrup");
  if (getChecked("extraShotCheck")) extras.push("Extra Espresso Shot");
  if (getChecked("whippedCreamCheck")) extras.push("Whipped Cream");
  if (getChecked("marshmallowsCheck")) extras.push("Marshmallows");
  if (getChecked("decafCheck")) extras.push("Decaf");
  return extras;
}

function calculateDrinkPrice() {
  var basePrices = {
    "Latte": 3.10,
    "Cappuccino": 3.10,
    "Flat White": 3.10,
    "Mocha": 3.70,
    "White Mocha": 3.70,
    "Espresso": 2.50,
    "Americano": 2.90,
    "Cortado": 2.70,
    "Matcha Latte": 4.00,
    "Chai Latte": 3.60,
    "Hot Chocolate": 2.80,
    "White Hot Chocolate": 2.80,
    "Tea": 2.60,
    "Herbal Tea": 2.60,
    "Tumeric Latte": 3.60,
    "Milk": 2.00
  };
  
  var price = basePrices[getText("drinkName")] || 0;
  
  // Add cost for dairy-free milk
  var milk = getText("milkDropdown");
  if (milk == "Oat" || milk == "Soya" || milk == "Coconut" || milk == "Almond") {
    price += 0.50;
  }
  
  // Add 50p for each extra (except Decaf)
  var extras = getSelectedExtras();
  for (var i = 0; i < extras.length; i++) {
    if (extras[i] !== "Decaf") {
      price += 0.50;
    }
  }
  
  return price;
}

function updateCheckoutButton() {
  if (basket.length > 0) {
    showElement("checkoutBtn");
  } else {
    hideElement("checkoutBtn");
  }
}

onEvent("basketBtn", "click", function() {
  updateBasketDisplay();
  updateCheckoutButton();
  setScreen("Basket");
});
onEvent("basketButton", "click", function(){
  updateBasketDisplay();
  updateCheckoutButton();
  setScreen("Basket");
});

function updateBasketDisplay() {
  // Update each slot
  if (basket.length > 0) {
    setText("item1Label", formatDrinkDescription(basket[0]));
    setText("item1Price", "£" + basket[0].price.toFixed(2));
    showItem(1);
  } else {
    hideItem(1);
  }
  
  if (basket.length > 1) {
    setText("item2Label", formatDrinkDescription(basket[1]));
    setText("item2Price", "£" + basket[1].price.toFixed(2));
    showItem(2);
  } else {
    hideItem(2);
  }
  
  if (basket.length > 2) {
    setText("item3Label", formatDrinkDescription(basket[2]));
    setText("item3Price", "£" + basket[2].price.toFixed(2));
    showItem(3);
  } else {
    hideItem(3);
  }
  
  if (basket.length > 3) {
    setText("item4Label", formatDrinkDescription(basket[3]));
    setText("item4Price", "£" + basket[3].price.toFixed(2));
    showItem(4);
  } else {
    hideItem(4);
  }

  // Update total
  var total = 0;
  for (var i = 0; i < basket.length; i++) {
    total += basket[i].price;
  }
  setText("totalPriceLbl", "Total: £" + total.toFixed(2));
}

function formatDrinkDescription(drink) {
  var description = drink.name + "\n";
  description += "- " + drink.hotOrIced + "\n";
  description += "- " + drink.milk + "\n";
  if (drink.extras.length > 0) {
    description += "- " + drink.extras.join(", ") + "\n";
  }
  if (drink.notes !== "") {
    description += "- Notes: " + drink.notes;
  }
  return description;
}

function showItem(number) {
  showElement("item" + number + "Label");
  showElement("item" + number + "Price");
  showElement("item" + number + "DeleteBtn");
}

function hideItem(number) {
  hideElement("item" + number + "Label");
  hideElement("item" + number + "Price");
  hideElement("item" + number + "DeleteBtn");
}

onEvent("item1DeleteBtn", "click", function() {
  basket.splice(0,1);
  updateBasketDisplay();
});
onEvent("item2DeleteBtn", "click", function() {
  basket.splice(1,1);
  updateBasketDisplay();
});
onEvent("item3DeleteBtn", "click", function() {
  basket.splice(2,1);
  updateBasketDisplay();
});
onEvent("item4DeleteBtn", "click", function() {
  basket.splice(3,1);
  updateBasketDisplay();
});

if (basket.length > 0) {
  showElement("checkoutBtn");
} else {
  hideElement("checkoutBtn");
}

onEvent("checkoutBtn", "click", function() {
  if (basket.length > 0) {
    var total = 0;
  for (var i = 0; i < basket.length; i++) {
    total += basket[i].price;
  }
    setText("totalLbl", "Total: £" + total.toFixed(2));
    setScreen("Payment"); // Or whatever your payment screen ID is
  }
});

onEvent("cardNumberInput", "input", function() {
  var cardNum = getText("cardNumberInput");
  
  // If longer than 16 characters, trim it
  if (cardNum.length > 16) {
    setText("cardNumberInput", cardNum.substring(0, 16));
  }
});

onEvent("cvcInput", "input", function() {
  var cvcNum = getText("cvcInput");
  
  // If longer than 16 characters, trim it
  if (cvcNum.length > 3) {
    setText("cvcInput", cvcNum.substring(0, 3));
  }
});

onEvent("confirmBtn", "click", function() {
  var cardNumber = getText("cardNumberInput").replace(/\s/g, ""); // remove spaces
  var expiry = getText("expiryDateInput");
  var cvc = getText("cvcInput");

  // Hide any old error message first
  setText("errorMessageLbl", "");

  // Card Number: must be 16 digits
  if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    setText("errorMessageLbl", "Please enter a valid card number");
    return;
  }

  // CVC: must be 3 digits
  if (cvc.length !== 3 || isNaN(cvc)) {
    setText("errorMessageLbl", "Please enter correct CVC");
    return;
  }

  // Expiry Date: must match MM/YYYY format
  var expiryRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  if (!expiryRegex.test(expiry)) {
    setText("errorMessageLbl", "Please enter a valid expiry date");
    return;
  }

  // If everything is OK, move to the Confirmation Screen
  showConfirmationScreen();
  // Copy the basket to baristaOrders
  baristaOrders = basket.slice();

  // Now you can clear basket if needed:
  basket = [];

});

onEvent("backToBasketBtn", "click", function(){
  setScreen("Basket");
});

function showConfirmationScreen() {
  // Generate random 4-digit number
  var orderNumber = Math.floor(1000 + Math.random() * 9000);

  // Update the Order Number label
  setText("orderNumberLbl", orderNumber);

  // Get the user's name (assuming it was captured during registration)
  // If you saved the name somewhere globally, e.g. loggedInName
  var fullName = loggedInName; // Example: "John Doe"
  var firstName = fullName.split(" ")[0]; // "John"

  // Update the Thank You message
  setText("thanksMessageLbl", "Thanks for your order " + firstName + ", your order number is " + orderNumber + ".\nYour barista is now preparing it.");

  // Move to the confirmation screen
  setScreen("Confirmation");
}

// Separate events for each star

// Star 1
onEvent("star1", "mouseover", function() {
  updateStarColors(1);
});
onEvent("star1", "mouseout", function() {
  updateStarColors(0);
});
onEvent("star1", "click", function() {
  selectedRating = 1;
  updateStarColors();
});

// Star 2
onEvent("star2", "mouseover", function() {
  updateStarColors(2);
});
onEvent("star2", "mouseout", function() {
  updateStarColors(0);
});
onEvent("star2", "click", function() {
  selectedRating = 2;
  updateStarColors();
});

// Star 3
onEvent("star3", "mouseover", function() {
  updateStarColors(3);
});
onEvent("star3", "mouseout", function() {
  updateStarColors(0);
});
onEvent("star3", "click", function() {
  selectedRating = 3;
  updateStarColors();
});

// Star 4
onEvent("star4", "mouseover", function() {
  updateStarColors(4);
});
onEvent("star4", "mouseout", function() {
  updateStarColors(0);
});
onEvent("star4", "click", function() {
  selectedRating = 4;
  updateStarColors();
});

// Star 5
onEvent("star5", "mouseover", function() {
  updateStarColors(5);
});
onEvent("star5", "mouseout", function() {
  updateStarColors(0);
});
onEvent("star5", "click", function() {
  selectedRating = 5;
  updateStarColors();
});



// Function to update star colors
function updateStarColors(hoveredStar) {
  var rating = hoveredStar || selectedRating;
  for (var i = 1; i <= 5; i++) {
    if (i <= rating) {
      setProperty("star" + i, "icon-color", "#612501");
    } else {
      setProperty("star" + i, "icon-color", "#ffffff");
    }
  }
}


// When user clicks "Back To Home"
onEvent("backToHomeBtn", "click", function() {
  selectedRating = 0;        
  updateStarColors(0);        
  basket = [];               
  updateBasketDisplay();     // make sure basket screen resets too
  setScreen("CoffeeMenu");    
});

function updateBaristaOrders() {
  for (var i = 0; i < 4; i++) {
    if (i < baristaOrders.length) {
      setText("drink" + (i + 1), formatDrinkDescription(baristaOrders[i]));
      showElement("drink" + (i + 1));
      showElement("drink" + (i + 1) + "CompleteBtn");
    } else {
      hideElement("drink" + (i + 1));
      hideElement("drink" + (i + 1) + "CompleteBtn");
    }
  }
}


onEvent("drink1CompleteBtn", "click", function() {
  removeOrderAtIndex(0);
});

onEvent("drink2CompleteBtn", "click", function() {
  removeOrderAtIndex(1);
});

onEvent("drink3CompleteBtn", "click", function() {
  removeOrderAtIndex(2);
});

onEvent("drink4CompleteBtn", "click", function() {
  removeOrderAtIndex(3);
});

function removeOrderAtIndex(index) {
  if (baristaOrders.length > index) {
    baristaOrders.splice(index, 1);  // remove the order
    updateBaristaOrders();           // re-render the labels/buttons
  }
}

onEvent("baristaProfileButton", "click", function() {
  getKeyValue(loggedInEmail, function(value) {
    if (value !== null && value !== "null") {
      var user = JSON.parse(value);
      setText("baristaProfileNameLabel", user.name);
      setText("baristaProfileEmailLabel", loggedInEmail);
    }
  });
  setScreen("BaristaProfile"); // your profile screen name
});

onEvent("baristaLogoutButton", "click", function() {
  loggedInEmail = ""; // clear the session
  setText("loginEmailInput", "");       // clears the email input
  setText("loginPasswordInput", "");    // clears the masked password field
  maskedLoginPassword = "";             // clears the stored actual password

  setScreen("Login"); // go back to login screen
});

onEvent("baristaChangePasswordButton", "click", function(){
setScreen("ChangePassword");
});

onEvent("backToBaristaHomeBtn", "click", function(){
  setScreen("BaristaHome");
});

onEvent("updateStockBtn", "click", function(){
  setScreen("UpdateStock");
});

onEvent("backToBaristaHomeBtn2", "click", function(){
  setScreen("BaristaHome");
});
