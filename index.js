const apiUrl = `https://api.exchangerate-api.com/v4/latest/`;

function fetchURL(from, to) {
    return fetch(`${apiUrl}${from}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.rates[to];
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function calculate(from, to) {
    const leftInput = document.querySelector('.left .mebleg');
    const rightInput = document.querySelector('.right .result');
    const amount = parseFloat(leftInput.value);
    if (!isNaN(amount)) {
        fetchURL(from, to)
            .then(rate => {
                const result = amount * rate;
                rightInput.value = result.toFixed(2);
            });
    } else {
        rightInput.value = '';
    }
}

const leftButtons = document.querySelectorAll('.left .btn');
leftButtons.forEach(button => {
    button.addEventListener('click', () => {
        leftButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const from = button.value;
        const to= document.querySelector('.right .btn.active').value;
        calculate(from, to);
    });
});

const rightButtons = document.querySelectorAll('.right .btn');
rightButtons.forEach(button => {
    button.addEventListener('click', () => {
        rightButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const to = button.value;
        const from = document.querySelector('.left .btn.active').value;
        calculate(from, to);
    });
});