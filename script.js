let node0 = new MiningNode(0, 'Gökalp');
let node1 = new MiningNode(1, 'Luis');
let node2 = new MiningNode(2, 'Bekir');
let blockchain = new Blockchain();
let CHART_DATA = {
    amounts: [0, 0, 0, 0, 0, 0],
    labels: ['', '', '', '', '', '']
};

function startNode0() {
    if (n0.classList == 'play-btn') {
        log('Node 0 starting ...');
    } else {
        log('Node 0 stopping ...');
    }
    n0.classList.toggle('pause-btn');
    node0.toggle();
}

function startNode1() {
    if (n1.classList == 'play-btn') {
        log('Node 1 starting ...');
    } else {
        log('Node 1 stopping ...');
    }
    n1.classList.toggle('pause-btn');
    node1.toggle();
}

function startNode2() {
    if (n2.classList == 'play-btn') {
        log('Node 2 starting ...');
    } else {
        log('Node 2 stopping ...');
    }
    n2.classList.toggle('pause-btn');
    node2.toggle();
}

function sendMoney() {
    console.log(from.value, to.value, amount.value);
    newTransaction.notify({
        from: from.value,
        to: to.value,
        amount: +amount.value // Mit dem + wandelt man es in eine Zahl um, ansonsten würde es als Text interpretiert werden
    });
}

function log(text) {
    let hours = ('0' + new Date().getHours()).slice(-2);
    // New Date wird ausgerechnet und gibt z.B. den Wert 7. Dann wird eine 0 vorne hinzugefügt -> 07. Durch slice(-2) nehmen wir immer die letzen 2 Ziffern
    // Also wenn new Date 15 gibt und vorne eine 0 hinzugefügt wird, haben wir immer noch als Zahl die 15, weil nur die letzen Zwei genommen werden!
    let minutes = ('0' + new Date().getMinutes()).slice(-2);
    logs.innerHTML += `<div class="mb-16">
    <code>
    <i>${hours}:${minutes}</i> | ${text}
</code></div>`;
}

function updateGraphData(moneyTable) {
    moneyTable.forEach((entry, index) => {
        CHART_DATA.amounts[index] = entry.amount;
        CHART_DATA.labels[index] = entry.name;
    });
    myChart.update();
}

function renderCurrentTransactions(transactions) {
    transactionContainer.innerHTML = '<h2>Transaktionen</h2>';
    transactions.forEach(ta => {
        transactionContainer.innerHTML +=
            `<div class="card mb-16">${ta.from} ➔ ${ta.to} $${ta.amount}</div>`;
    });

}