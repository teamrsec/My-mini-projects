let count = 1;

function renderCount() {
    document.getElementById('count').textContent = count;
}

function increment() {
    count++;
    renderCount();
}

function decrement() {
    count--;
    renderCount();
}

function reset() {
    count = 1;
    renderCount();
}

document.getElementById('increment').addEventListener('click', increment);
document.getElementById('decrement').addEventListener('click', decrement);
document.getElementById('reset').addEventListener('click', reset);
renderCount();