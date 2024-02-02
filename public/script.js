function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validate the login credentials (this is just a placeholder)
    if (username && password) {
        alert("Login successful!");
    } else {
        alert("Please enter valid login credentials.");
    }
}

function submitRegisterForm() {
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;
    var phone = document.getElementById("register-phone").value;

    // Validate and register the new user (this is just a placeholder)
    if (username && password && phone) {
        alert("Registration successful!");
        switchForm('welcome');
    } else {
        alert("Please enter valid registration details.");
    }
}

function switchForm(formType) {
    var loginBox = document.getElementById("login-box");
    var registerBox = document.getElementById("register-box");
    var welcomeBox = document.getElementById("welcome-box");

    if (formType === 'register') {
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
        welcomeBox.style.display = 'none';
    } else if (formType === 'login') {
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
        welcomeBox.style.display = 'none';
    } else if (formType === 'welcome') {
        loginBox.style.display = 'none';
        registerBox.style.display = 'none';
        welcomeBox.style.display = 'block';
    }
}
