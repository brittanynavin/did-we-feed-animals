const { ipcRenderer } = require('electron')
const moment = require('moment-timezone')

const animalsSection = document.querySelector('.animals');
const addAnimalForm = document.querySelector('.add-animal-form');
const addAnimalInput = document.querySelector('.add-animal-input');
const currentDateElem = document.getElementById('current-date');
const currentTimezoneElem = document.getElementById('current-timezone');

const currentTimezone = moment.tz.guess();
const todaysDate = moment.tz(moment(), currentTimezone).format('MMMM Do YYYY');

if (currentDateElem) currentDateElem.innerText = todaysDate;
if (currentTimezoneElem) currentTimezoneElem.innerText = currentTimezone;

addAnimalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const animalName = addAnimalInput.value;

    storeAnimal(animalName);
    renderAnimals();
    clearForm();
});

document.getElementById('clear-animals').addEventListener('click', () => {
    clearAnimals();
})

const getAnimals = () => {
    return Object.keys(localStorage)
        .map(key => JSON.parse(localStorage.getItem(key)));
}

const storeAnimal = (animalName) => {
    localStorage.setItem(
        animalName, 
        JSON.stringify({
            animalName: animalName,
            feedings: [
                {
                    id: 1,
                    date: Date.now(),
                    morningFeedingCompleted: false,
                    nightFeedingCompleted: false
                },
            ],
        })
    );
};

const convertToElement = (animal) => {
    return `<h3>${animal.animalName}</h3>`;
};

const renderAnimals = () => {
    const animalHeadings = getAnimals().map(convertToElement).join('');
    animalsSection.innerHTML = animalHeadings;
}

const clearAnimals = () => {
    localStorage.clear();
    renderAnimals();
}

const clearForm = () => {
    addAnimalInput.value = null;
}