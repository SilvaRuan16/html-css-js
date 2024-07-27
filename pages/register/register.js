function onChangeEmail() {
    const email = form.email().value;

    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block';
    validatePasswordMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordMatch();
    toggleRegisterButtonDisable();
}

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        hideLoading();
        location.href = '../home/home.html';
    }).catch(error => { 
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if(error.code == 'auth/email-already-in-use') {
        return 'Este email já está em uso!';
    }
    return error.message;
}

function validatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? 'none' : 'block';
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.querySelector('#confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.querySelector('#password-doesnt-match-error'),
    email: () => document.querySelector('#email'),
    emailInvalidError: () => document.querySelector('#email-invalid-error'),
    emailRequiredError: () => document.querySelector('#email-required-error'),
    password: () => document.querySelector('#password'),
    passwordRequiredError: () => document.querySelector('#password-required-error'),
    passwordMinLengthError: () => document.querySelector('#password-min-length-error'),
    registerButton: () => document.querySelector('#register-button')
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        location.href = 'pages/home/home.html';
    }
})