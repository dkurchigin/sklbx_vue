const app = document.getElementById('app');

const button = app.querySelector('.form button');

button.addEventListener('click', function(){
    const input = app.querySelector('.form input');
    const taskMessage = input.value;
    input.value = '';

    const task = '<div class="item">' + taskMessage + '</div>';

    const list = app.querySelector('.list');
    list.innerHTML += task;

    const counter = app.querySelector('.counter');
    counter.innerHTML = list.querySelectorAll('div').length;
});