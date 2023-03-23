// ELEMENTS
const boxGeneratorEl = document.querySelector('#box-generator');
const boxResultsEl = document.querySelector('#box-results');
const numbersBoxEl = document.querySelector('#numbers-box');
const howManyEl = document.querySelector('#how-many');
const minEl = document.querySelector('#min');
const maxEl = document.querySelector('#max');
const repeatEl = document.querySelector('#repeat');
const copyButtonEl = document.querySelector('#copy-icon');
const copyWarningEl = document.querySelector('#copy-warning');
const errorWarningEl = document.querySelector('#error-warning');
const errorMessageEl = document.querySelector('#error-message');
const backEl = document.querySelector('#back');

let isValid = true;

// SHOW COPY WARNING
const showCopyWarning = () => {
    copyWarningEl.style.opacity = '100';
    setTimeout(() => {
        copyWarningEl.style.opacity = '0';
    }, 1200);
}

// COPY TO CLIPBOARD
const copyToClipboard = (event) => {
    navigator.clipboard.writeText(event.target.innerText);

    showCopyWarning();
}

const copyAllToClipboard = (results) => {
    const str = String(results).replaceAll(',', ', ');
    navigator.clipboard.writeText(str);

    showCopyWarning();
}

// SHOW ERROR WARNING
const showErrorWarning = (msg) => {
    errorMessageEl.innerText = msg;
    errorWarningEl.style.opacity = '100';
    setTimeout(() => {
        errorWarningEl.style.opacity = '0';
    }, 2400);
}

// RANDOM NUMBER GENERATOR
const generateRandom = () => {
    minEl.style.borderColor = 'transparent';
    maxEl.style.borderColor = 'transparent';
    howManyEl.style.borderColor = 'transparent';

    isValid = true;
    const isRepeatable = repeatEl.checked;

    const howMany = howManyEl.value;
    let min = minEl.value;
    let max = maxEl.value;
    const results = [];

    min = Math.ceil(min);
    max = Math.floor(max);

    if (howMany >= 1) {
        for (let i = 0; i < howMany; i++) {
            let value = Math.floor(Math.random() * (max - min + 1) + min);

            // dont repeat numbers
            if (!isRepeatable) {
                if ((max - min + 1) >= howMany) {
                    while (results.includes(value)) {
                        value = Math.floor(Math.random() * (max - min + 1) + min);
                    }
                } else {
                    minEl.style.borderColor = 'transparent';
                    maxEl.style.borderColor = 'transparent';
                    howManyEl.style.border = 'solid 2px #ef233c';

                    isValid = false;

                    showErrorWarning('Enter a valid amount');
                }
            }

            if (max < min) {
                howManyEl.style.borderColor = 'transparent';
                minEl.style.border = 'solid 2px #ef233c';
                maxEl.style.border = 'solid 2px #ef233c';

                isValid = false;

                showErrorWarning('The maximum value cannot be less than the minimum');
            }

            if (isValid) {
                results.push(value);
            } else {
                return;
            }
        }
    } else {
        minEl.style.borderColor = 'transparent';
        maxEl.style.borderColor = 'transparent';
        howManyEl.style.border = 'solid 2px #ef233c';
        isValid = false;

        showErrorWarning('Enter a valid amount');

        return;
    }

    results.sort((a, b) => a - b);

    for (const r of results) {
        if ('content' in document.createElement('template')) {
            const template = document.querySelector('#result-template');

            const clone = template.content.cloneNode(true);
            const circle = clone.querySelector('.circle');
            circle.textContent = r;

            circle.addEventListener('click', copyToClipboard);

            numbersBoxEl.appendChild(clone);
        }
    }

    boxGeneratorEl.style.display = 'none';
    boxResultsEl.style.display = 'block';

    copyButtonEl.addEventListener('click', () => copyAllToClipboard(results));

    return results;
}

const btn = document.querySelector('#gen-btn');
btn.addEventListener('click', generateRandom);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// RETURN
const back = () => {
    boxResultsEl.style.display = 'none';
    boxGeneratorEl.style.display = 'flex';

    const divs = numbersBoxEl.querySelectorAll('div');
    for (div of divs) {
        div.remove();
    }
}

backEl.addEventListener('click', back);