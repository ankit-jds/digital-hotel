let element = document.getElementById("tbody")
let list = JSON.parse(localStorage.getItem("itemList"))
// console.log(list);
list.forEach((item) => {
    element.innerHTML += item
})
console.log(element);
let rows = element.getElementsByClassName('rows')
console.log(rows);
var total = 0
var order_list={}
for (let index = 0; index < rows.length; index++) {
    var row = rows[index]
    console.log(row);
    var price = row.getElementsByClassName('price')[0].textContent;
    console.log(price);
    var quantity = row.getElementsByClassName('quantity')[0].textContent;
    console.log(quantity);
    order_list[row.id]=quantity
    total += parseInt(price) * parseInt(quantity)
}
element.innerHTML += `
<th scope="col"></th>
<th scope="col"></th>
<th scope="col">${total}</th>
<th scope="col"></th>`
console.log((order_list))
console.log((JSON.stringify(order_list)))
document.getElementById('order_list').value=JSON.stringify(order_list)

