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


/////////////////////////////
// update UI
let table = $('table tbody');
let sortByAll = $(".filter-btn.all");
let sortByDate = $(".filter-btn.date");
let sortByName = $(".filter-btn.name");
let sortByCompany = $(".filter-btn.company");
let sortBtn = Array.from($$(".filter-btn"));

// switch active class onclick of each button
sortBtn.forEach(btn => btn.addEventListener('click', e => {
    sortBtn.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

}))


// template for data
function UIDatatemplate(user) {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${user.firstName.charAt(0).toUpperCase()}${user.firstName.substr(1)}</td>
                    <td>${user.lastName.charAt(0).toUpperCase()}${user.lastName.substr(1)}</td>
                    <td>${user.email}</td>
                    <td>${user.companyName}</td>
                    <td>${user.jobTitle}</td>
                    <td>${user.createdAt.substr(0, 10)}</td>`;
    table.appendChild(tr);
    return tr.innerHTML;
}


// init func to show data normally by default while also storing it in a variable for further manipulation
let jsonData;
fetch("https://omwg.herokuapp.com/register/")
    .then(res => res.json())
    .then(json => {
        table.innerHTML = '';
        json.data.registrants.forEach(registrant => {
            UIDatatemplate(registrant);
        });
        jsonData = json;
    })
    .catch(err => console.log(err));

// function to show default on click of all btn
function showAll() {
    fetch("https://omwg.herokuapp.com/register/")
        .then(res => res.json())
        .then(json => {
            table.innerHTML = '';
            json.data.registrants.forEach(registrant => {
                UIDatatemplate(registrant);
            });
        })
        .catch(err => console.log(err));
};

// sort order for string type properties on json data
function sortType(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
};

// sort all string values
function sortStr(prop) {
    table.innerHTML = '';
    jsonData.data.registrants
        .sort(sortType(prop))
        .forEach(registrant => {
            UIDatatemplate(registrant);
        })
};

// sort by date
function sortDate(prop) {
    table.innerHTML = '';
    jsonData.data.registrants
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .forEach(registrant => {
            UIDatatemplate(registrant);
        })
};

sortByAll.addEventListener('click', showAll);
sortByDate.addEventListener('click', sortDate);
sortByName.addEventListener('click', _ => sortStr("firstName"));
sortByCompany.addEventListener('click', _ => sortStr("companyName"));

// fetch("https://omwg.herokuapp.com/register/download")
//     .then(res => res.json())
//     .then(download => console.log(download))
//     .catch(err => console.log(err));








