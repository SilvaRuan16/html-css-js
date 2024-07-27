function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';

    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
}

function togglePasswordErrors() {
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? 'none' : 'block';
}

function toggleButtonDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        hideLoading();
        location.href = 'pages/home/home.html';
    },).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    },);
}

function register() {
    location.href = 'pages/register/register.html';
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code === 'auth/invalid-credential') {
        return 'Usuário não encontrado';
    } else if (error.code === 'auth/invalid-email') {
        return 'E-mail inválido';
    }
    return error.message;
}

const form = {
    email: () => document.querySelector('#email'),
    emailRequiredError: () => document.querySelector('#email-required-error'),
    emailInvalidError: () => document.querySelector('#email-invalid-error'),
    password: () => document.querySelector('#password'),
    passwordRequiredError: () => document.querySelector('#password-required-error'),
    recoverPassword: () => document.querySelector('#recover-password-button'),
    loginButton: () => document.querySelector('#login-button')
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        location.href = 'pages/home/home.html';
    }
})