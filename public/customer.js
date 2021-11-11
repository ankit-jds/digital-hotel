console.log("customer script workiing...")
var itemList = [];
var itemNum = [];
var itemId = [];

document.querySelectorAll('.order').forEach(item => {
    item.addEventListener('click', () => {
        let row = item.parentElement.parentElement
        let content = row.getElementsByClassName('select')
        let str = ""

        for (let index = 1; index < content.length; index++) {
            str += content[index].outerHTML;
            if (index === 3) {
                // itemPrice.push(content[index].textContent)
            }
        }
        console.log(str);

        if (!itemList.includes(str)) {
            // str += `<td class="select">01</td>`
            itemList.push(str)
            itemId.push(item.id)

            itemNum.push(1)
        } else {
            let index = itemList.indexOf(str)
            itemNum[index] += 1
        }
        console.log(itemList, itemNum);

    })
})

document.querySelector("#proceed").addEventListener('click', () => {
    console.log("proceed");
    for (let index = 0; index < itemList.length; index++) {
        itemList[index] = `<tr class="rows" id="${itemId[index]}">
        ${itemList[index]}
        <td class="quantity select">${itemNum[index]}</td>
        </tr>`
        console.log(itemList);
    }
    localStorage.setItem("itemList", JSON.stringify(itemList))
})
