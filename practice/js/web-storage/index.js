let nameInput = document.querySelector('input[name = "name"]');
let ageInput = document.querySelector('input[name = "age"]');

// local storage is shared within all the pages of the same domain
nameInput.value = localStorage.name || "";
ageInput.value = localStorage.age || 0;
nameInput.addEventListener('change', (e)=>{
    localStorage.setItem('name', e.target.value);
    nameInput.value = localStorage.name || "";
});

ageInput.addEventListener('change', (e)=>{
    localStorage.setItem('age', e.target.value);
    ageInput.value = localStorage.age || 0;
});

// if data needs to be stored only for the single tab/window then sessionsStorage to be used

nameInput.addEventListener('change', (e)=>{
    sessionStorage.name = e.target.value;
    nameInput.value = sessionStorage.name || "";
});
ageInput.addEventListener('change', (e)=>{
    sessionStorage.age = e.target.value;
    ageInput.value = sessionStorage.age || 0;
});

