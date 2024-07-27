function logout() {
    firebase.auth().signOut().then(() => {
        location.href = '../../index.html';
    }).catch(() => {
        alert('Erro ao fazer logOut');
    })
}

findTransactions();

function findTransactions() {
    setTimeout(() => {
        addTransactionsToScreen(fakeTransactions);
    }, 1000)
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.querySelector('#transactions');

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if(transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}

const fakeTransactions = [{
    type: 'expanse',
    date: '2024-01-01',
    money: {
        currency: 'R$',
        value: 10
    },
    transactionType: 'Supermecado'
},{
    type: 'income',
    date: '2024-01-01',
    money: {
        currency: 'R$',
        value: 1030
    },
    transactionType: 'Salário',
    description: 'Salário semanal'
},{
    type: 'expanse',
    date: '2024-01-01',
    money: {
        currency: 'EUR',
        value: 8
    },
    transactionType: 'Plano de saúde',
    description: 'Mensal'
},{
    type: 'expanse',
    date: '2024-01-01',
    money: {
        currency: 'USD',
        value: 14
    },
    transactionType: 'Calçados',
    description: 'Trimestral'
}]