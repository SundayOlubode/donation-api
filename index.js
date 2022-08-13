// const labels = document.getElementsByTagName('label')
// console.log(labels)
// alert(document.title)
// console.log(document.body)
// const hi = [2,3,4,5,6,7,8]
// console.log(hi[hi.length-1])
// const trs = document.querySelectorAll('tr')
// console.log(trs)
// trs.insert
// const rowToClone = trs[trs.length -1]
// console.log(rowToClone)
// const clonedRow = rowToClone.cloneNode(true)
// document.body.main.table.tr
// document.body.table.tr
// function rowFunction(x) {
//     var a = document.getElementsByTagName(x).insertRow(0);
//     var b = a.insertCell(0);
//     var c = a.insertCell(1);
//     b.innerHTML = c.innerHTML = "row";
//  }
// rowFunction('tr')

let User = {
    Admin : {
        name: 'Michael Olubode',
        email: 'olu@gmail.com',
        password: 'grace'
    },
    fname: 'Sunday'
}

// Date

var d = new Date();
var date = d.getUTCDate();
var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
var year = d.getUTCFullYear();    
var dateStr = date + "/" + month + "/" + year;

const h2 = document.querySelector('h2')
h2.innerText = 'Welcome, '+ User.Admin.name

const amount = 'NGN 10,000'
function myFunction() {
    var table = document.querySelector("#myTable");
    // console.log(table)
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerText = dateStr;
    cell2.innerText = amount;
}

// const myForm = document.querySelector('#myTable')
// console.log(myForm)
// const myInputDiv = document.createElement('tr')
// myForm.append(myInputDiv)
// myInputDiv.insertCell(0).innerText = 'Cheers to a new begginning'
// myInputDiv.insertCell(1).innerText = 'Cheers to a new begginning'