firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        location.href = '../../index.html';
    }
})