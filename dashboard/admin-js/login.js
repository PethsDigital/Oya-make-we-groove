// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

const emailInput = $("#email");
const passwordInput = $("#password");
const loginForm = $(".login-form");


// function to handle msg
function msgDisplay(type, resMsg) {
    let msg;
    msg = document.createElement('p');
    msg.className = 'msg';
    loginForm.appendChild(msg);
    Array.from($$(".login-form input")).forEach((input) => input.value = "");
    if (type === "success") {
        msg.innerHTML = `&check; &nbsp; ${resMsg}`;
    } else {
        msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
        msg.style.background = "rgba(248, 20, 3, 0.658)";
    }
    setTimeout(() => {
        msg.style.display = "none";
    }, 4000);
}

loginForm.addEventListener("submit", e => {
    const loginBtn = $(".register-btn");
    loginBtn.textContent = "loading...";
    loginBtn.disabled = true;

    let loginVal = {
        email: emailInput.value,
        password: passwordInput.value
    };

    fetch("https://omwg.herokuapp.com/admin/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(loginVal),
        redirect: 'follow'
    })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            if (response.message == "login successful") {
                localStorage.setItem('oymg_token', response.data.token);
                window.location.replace("https://oymg.netlify.app/dashboard/dashboard.html");
                msgDisplay("success", response.message);
            } else {
                msgDisplay("error", response.message);
            }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            msgDisplay("error", "Login failed...");
        })
        .finally(_ => {
            loginBtn.textContent = "Register";
            loginBtn.disabled = false;
        });
    e.preventDefault();
});