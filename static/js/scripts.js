
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

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();













// функция для изменения количества товара
function changeQty(btn, delta) {
    const row = btn.closest('tr');
    const qtyCell = row.querySelector('.quantity');
    let qty = parseInt(qtyCell.textContent);
    qty += delta;
    if (qty < 0) qty = 0;
    qtyCell.textContent = qty;
    updateTotal();
}

// функция для подсчета общей стоимости
function updateTotal() {
    const rows = document.querySelectorAll('#serviceTable tr');
    let total = 0;
    rows.forEach(row => {
        const price = parseFloat(row.querySelector('.price').textContent);
        const qty = parseInt(row.querySelector('.quantity').textContent);
        total += price * qty;
    });
    document.getElementById('totalSum').textContent = total;
}

// функция для сброса всех значений
function resetAll() {
    const qtyCells = document.querySelectorAll('.quantity');
    qtyCells.forEach(cell => {
        cell.textContent = '0';
    });
    updateTotal();
}

// Обновляем сумму при загрузке страницы
window.onload = updateTotal;