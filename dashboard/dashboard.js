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
let pageCount = 1;
let jsonData;
// let url = `https://omwg.herokuapp.com/register?limit=10&page=${pageCount}`;


// fetch function
function fetchData() {
    let url = `./sample${pageCount}.json`;
    return fetch(url)
        .then(res => res.json())
        .then(json => json.data)
        .catch(err => console.log(err));
};

// switch active class onclick of each sort button
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
};

// function to show default
function showAll() {
    fetchData()
        .then(data => {
            table.innerHTML = '';
            data.registrants.forEach(registrant => {
                UIDatatemplate(registrant);
                jsonData = data;
            });
        });
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
    jsonData.registrants
        .sort(sortType(prop))
        .forEach(registrant => {
            UIDatatemplate(registrant);
        })
};

// sort by date
function sortDate(prop) {
    table.innerHTML = '';
    jsonData.registrants
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .forEach(registrant => {
            UIDatatemplate(registrant);
        })
};

// show and sort functions invoked
showAll();
sortByAll.addEventListener('click', showAll);
sortByDate.addEventListener('click', sortDate);
sortByName.addEventListener('click', _ => sortStr("firstName"));
sortByCompany.addEventListener('click', _ => sortStr("companyName"));

let next = $(".next");
let prev = $(".prev");
let nextLinks = Array.from($$(".next-links a"));
let nextPrev = Array.from($$(".footer button"));

next.addEventListener('click', (e) => {
    pageCount === jsonData.totalPages ? pageCount = 1 : pageCount++;
    showAll();
});

prev.addEventListener('click', (e) => {
    pageCount === 1 ? pageCount = jsonData.totalPages : pageCount--;
    showAll();
});




// fetch("https://omwg.herokuapp.com/register/download")
//     .then(res => res.json())
//     .then(download => console.log(download))
//     .catch(err => console.log(err));








