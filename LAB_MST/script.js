let total = 0
function addExpense() {
    let name = document.getElementById("name").value
    let amount = document.getElementById("amount").value
    let category = document.getElementById("category").value

    let table = document.getElementById("table")
    let tr = document.createElement("tr")
    tr.innerHTML = "<td>" + name + "</td><td>" + amount + "</td><td>" + category + "</td><td><button onclick='updateExpense(this)'>Update</button></td>"
    table.appendChild(tr)
    total = total + Number(amount)
    document.getElementById("total").innerText = total
}
function updateExpense(btn) {
    let row = btn.parentNode.parentNode
    document.getElementById("name").value = row.cells[0].innerText
    document.getElementById("amount").value = row.cells[1].innerText
    document.getElementById("category").value = row.cells[2].innerText

    let amount = row.cells[1].innerText
    total = total - Number(amount)
    document.getElementById("total").innerText = total
    row.remove()
}