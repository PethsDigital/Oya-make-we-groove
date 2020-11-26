// shortcut querySelector
// const $ = el => document.querySelector(el);
// const $$ = el => document.querySelectorAll(el);

const registrationForm = $('.registration-form');
const formOverlay = $('.overlay');
const btn = $(".register-btn");


// function to handle msg
function displayMsg(type, resMsg) {
    let msg;
    msg = document.createElement('p');
    msg.className = 'msg';
    registrationForm.appendChild(msg);
    Array.from($$(".registration-form input")).forEach((input) => input.value = "");
    if (type === "success") {
        msg.innerHTML = `&check; &nbsp; ${resMsg}`;
    } else {
        msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
        msg.style.background = "rgba(248, 20, 3, 0.658)"
    }
    setTimeout(() => {
        msg.style.display = "none";
        registrationForm.style.transform = 'translate(-50%, -50%) scale(0)';
        formOverlay.style.display = 'none';
    }, 4000);
}


// grab elements
const firstNameInput = $("#first-name");
const lastNameInput = $("#last-name");
const emailInput = $("#email");
const jobInput = $("#job");
const companyInput = $("#company");



//form submit function
registrationForm.addEventListener("submit", (e) => {
    // dosable btn
    btn.textContent = "loading...";
    btn.disabled = true;

    let formValues = {
        firstName: `${firstNameInput.value.charAt(0).toUpperCase()}${firstNameInput.value.substr(1)}`,
        lastName: `${lastNameInput.value.charAt(0).toUpperCase()}${lastNameInput.value.substr(1)}`,
        email: emailInput.value,
        companyName: `${companyInput.value.charAt(0).toUpperCase()}${companyInput.value.substr(1)}`,
        jobTitle: `${jobInput.value.charAt(0).toUpperCase()}${jobInput.value.substr(1)}`
    }

    // fetch request
    fetch("https://omwg.herokuapp.com/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formValues),
        redirect: 'follow'
    })
        .then(res => res.json())
        .then(result => {
            if (result.message == "you have successfully registered for the event") {
                displayMsg("success", result.message);
            } else if (result.message == "registration failed") {
                displayMsg("error", "You have already registered for this event");
            } else {
                displayMsg("error", result.message);
            }
            console.log(result);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            displayMsg("error", "Registration failed, try again later");
        })
        .finally(_ => {
            btn.textContent = "Register";
            btn.disabled = false;
        })
    e.preventDefault();
});