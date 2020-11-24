// shortcut querySelector
// const $ = el => document.querySelector(el);
// const $$ = el => document.querySelectorAll(el);

const registrationForm = $('.registration-form');
const formOverlay = $('.overlay');
const btn = $(".register-btn");


// function to handle msg
function displayMsg(type, res) {
    let msg;
    msg = document.createElement('p');
    msg.className = 'msg';
    registrationForm.appendChild(msg);
    Array.from($$(".registration-form input")).forEach((input) => input.value = "");
    if (type === "success") {
        msg.innerHTML = `&check; &nbsp; ${res.message}`;
    } else {
        msg.innerHTML = '&#9888; &nbsp; An error occured, pls try again later';
        msg.style.background = "rgba(248, 20, 3, 0.658)"
    }
    setTimeout(() => {
        msg.style.display = "none";
        registrationForm.style.transform = 'translate(-50%, -50%) scale(0)';
        formOverlay.style.display = 'none';
    }, 4000);
}

//form submit function
registrationForm.addEventListener("submit", (e) => {
    // dosable btn
    btn.textContent = "loading...";
    btn.disabled = true;

    // grab elements
    const firstNameInput = $("#first-name");
    const lastNameInput = $("#last-name");
    const emailInput = $("#email");
    const jobInput = $("#job");
    const companyInput = $("#company");

    // fetch request
    fetch("https://omwg.herokuapp.com/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8'
        },
        body: JSON.stringify({
            firstName: firstNameInput.value,
            lastname: lastNameInput.value,
            email: emailInput.value,
            companyName: companyInput.value,
            jobTitle: jobInput.value
        })
    })
        .then(res => res.json())
        .then(result => {
            displayMsg("success", result);
        })
        .catch(err => {
            console.log(err);
            displayMsg("error");
        })
        .finally(_ => {
            btn.textContent = "Register";
            btn.disabled = false;
        })
    e.preventDefault();
});