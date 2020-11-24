// shortcut querySelector
const query = el => document.querySelector(el);
const queryAll = el => document.querySelectorAll(el);

// darkmode toggle
query('.dark-mode-btn').addEventListener('click', e => {
    document.body.classList.toggle('dark-scheme');
    document.body.style.transition = 'all .3s linear';
    if (document.body.className.includes('dark-scheme')) {
        query('.dark-mode-btn').innerHTML = '<i class="fa fa-sun"></i> Light';
    } else {
        query('.dark-mode-btn').innerHTML = '<i class="fa fa-moon"></i> Dark';

    }
});