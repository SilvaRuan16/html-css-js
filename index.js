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
    if(!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if(!password) {
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
    form.recoverPassword().disabled = !emailValid || !passwordValid;
}

const form = {
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}