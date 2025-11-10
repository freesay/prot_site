
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


const originalValues = {
    uniquePrice: 0,
    quantities: []
};

function saveInitialValues() {
    const table = document.getElementById('serviceTable');
    const rows = table.getElementsByTagName('tr');
    const uniquePriceInput = rows[0].querySelector('input.input');
    originalValues.uniquePrice = parseFloat(uniquePriceInput.value.trim().replace(',', '.')) || 0;

    originalValues.quantities = [];
    for (let i = 1; i < rows.length; i++) {
        const qtyCell = rows[i].querySelector('.quantity');
        const quantity = parseInt(qtyCell.textContent.trim()) || 0;
    originalValues.quantities.push({ rowIndex: i, quantity: quantity });
    }
}

function resetAll() {
    const table = document.getElementById('serviceTable');
    const rows = table.getElementsByTagName('tr');

    rows[0].querySelector('input.input').value = originalValues.uniquePrice;


    originalValues.quantities.forEach(item => {
        const qtyCell = rows[item.rowIndex].querySelector('.quantity');
        qtyCell.textContent = item.quantity;
    });

    updateSum();
}

function updateSum() {
    const table = document.getElementById('serviceTable');
    const rows = table.getElementsByTagName('tr');

    const uniquePriceInput = rows[0].querySelector('input.input');
    const uniquePrice = parseFloat(uniquePriceInput.value.trim().replace(',', '.')) || 0;

    let totalSum = 0;
    const priceLimit = 100000;

    if (uniquePrice <= priceLimit) {
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const priceCell = row.querySelector('.price');
            const price = parseFloat(priceCell.textContent.trim().replace(',', '.')) || 0;
            const quantityCell = row.querySelector('.quantity');
            const quantity = parseInt(quantityCell.textContent.trim()) || 0;
            totalSum += price * quantity;
        }
    } else {
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.classList && row.classList.contains('ignore')) {
                continue;
            }
            const priceCell = row.querySelector('.price');
            const price = parseFloat(priceCell.textContent.trim().replace(',', '.')) || 0;
            const quantityCell = row.querySelector('.quantity');
            const quantity = parseInt(quantityCell.textContent.trim()) || 0;
            totalSum += price * quantity;
        }
        totalSum += uniquePrice * 0.12;
    }

    document.getElementById('sumDisplay').textContent = totalSum;
}

function changeQty(btn, delta) {
    const row = btn.closest('tr');
    const qtyCell = row.querySelector('.quantity');
    let qty = parseInt(qtyCell.textContent.trim()) || 0;
    qty += delta;
    if (qty < 0) qty = 0;
    qtyCell.textContent = qty;
    updateSum();
}

window.onload = () => {
    saveInitialValues();
    updateSum();
};
