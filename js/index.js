// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);


// code for count down begins here
const countDownTimer = function (time) {

    //2. calculate distance between curr time and deadline
    let deadline = new Date(time).getTime();
    let currTime = new Date().getTime();
    let distTime = deadline - currTime;

    // calc the time left from deadline in days, hrs, mins, sec.
    let secsLeft = Math.floor((distTime / 1000) % 60);
    let minsLeft = Math.floor((distTime / (1000 * 60)) % 60);
    let hrsLeft = Math.floor((distTime / (1000 * 60 * 60)) % 24);
    let daysLeft = Math.floor(distTime / (1000 * 60 * 60 * 24));

    return {
        secsLeft,
        minsLeft,
        hrsLeft,
        daysLeft,
        distTime
    };
};

const updateUITime = function () {
    let tLeft = countDownTimer('Dec 12, 2020 18:00:00 GMT+0000');

    // grab my time html elements to be updated here
    const days = $(".time.days");
    const hrs = $(".time.hrs");
    const min = $(".time.min");
    const sec = $(".time.sec");

    sec.innerHTML = ('0' + tLeft.secsLeft).slice(-2);
    min.innerHTML = ('0' + tLeft.minsLeft).slice(-2);
    hrs.innerHTML = ('0' + tLeft.hrsLeft).slice(-2);
    days.innerHTML = ('0' + tLeft.daysLeft).slice(-2);

    if (tLeft.distTime <= 0) clearInterval(timeInterval);
}

updateUITime();
let timeInterval = setInterval(updateUITime, 1000);
// countdown code ends here

// navbar toggle function
let navbar = $(".nav2");
let navLink = $$(".nav2 a");
let openToggle = $(".fa.fa-bars");

openToggle.addEventListener('click', _ => navbar.style.cssText = 'clip-path: circle(100%);');
Array.from(navLink).forEach(link => link.addEventListener('click', _ => navbar.style.cssText = " clip-path: circle(0% at 100% 0);"));


// change nav background on window scroll
window.addEventListener('scroll', _ => {
    let nav = $('.nav1');
    let nav1Link = Array.from($$('.nav1 .navLink a, i.fa-bars'));

    if (window.pageYOffset == 0) {
        nav.style.cssText = "background: transparent;";
        nav1Link.forEach(link => link.style.color = 'white');
    } else if (window.pageYOffset > 0) {
        nav.style.cssText = "background: var(--bg-color);";
        nav1Link.forEach(link => link.style.color = 'var(--text-color)');
    }
})



// form display
// let form = $('.registration-form');
// let overlay = $('.overlay');
// let registerBtn = $$('.register');
// let closeForm = $(".registration-form a");

// Array.from(registerBtn).forEach(btn => btn.addEventListener('click', _ => {
//     form.style.transform = 'translate(-50%, -50%) scale(1)';
//     overlay.style.display = 'block';
// }));

// closeForm.addEventListener('click', closeModal);

// function closeModal() {
//     form.style.transform = 'translate(-50%, -50%) scale(0)';
//     overlay.style.display = 'none';
// }


