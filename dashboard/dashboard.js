// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

// navbar toggle function
let nav = $("nav.side-nav");
let navLinks = $$(".side-nav a, .overlay");
let bars = $(".fa.fa-bars");
let overlay = $(".overlay");


bars.addEventListener('click', _ => navFunc("block", "0"));
Array.from(navLinks).forEach(link => link.addEventListener('click', _ => navFunc("none", "100%")));

function navFunc(type, val) {
    nav.style.cssText = `clip-path: inset(0 ${val} 0 0);`;
    overlay.style.display = type;
};

// let dataRow = `<<td>${data.firstName}</td>
//                 <td>${data.lastName}</td>
//                 <td>${data.email}</td>
//                 <td>${data.companyName}</td>
//                 <td>${data.jobTitle}</td>
//                 <td>${data.updatedAt}</td>`

fetch("https://omwg.herokuapp.com")
    .then(res => res.json())
    .then(jsonData => console.log(jsonData))
    .catch(err => console.log(err));



// let table = $('table tbody');
// let tr = document.createElement('tr');
// tr.innerHTML = dataRow;
// table.appendChild(tr);
