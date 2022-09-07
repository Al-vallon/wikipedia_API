// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
'user strict'

const form = document.querySelector('form')
const input = document.querySelector('.input_text')
const errorMsg = document.querySelector('.error_msg')

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault()

    if (input.value === '') {
        errorMsg.textContent = 'Please, can you write your research. Thank you ';
        return;
    } else {
        errorMsg.textContent = '';
        wikiApiCall(input.value)
    }

    async function wikiApiCall(searchInput){
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);       
        const data = await response.json();
        createCards(data.query.search);
        console.log(data);
    }
}

const resultDisplay = document.querySelector('.result_display')

function createCards(data){
    if (!data.length){
        errorMsg.textContent = 'it \'s empty';
        return;
    }
    
    data.forEach (el => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        const cards = document.createElement('div')
        cards.className = "card";
        cards.innerHTML = `
        <h3 class="result_title">
        <a class="link" href = "" target = _blank">${el.title}</a>
        </h3>
        <a class="result_link" href = "" "target = _blank">${url}</a>
        <span class='result_snippet'>${el.snippet}</span>
        `
        resultDisplay.appendChild(cards)
        
    });

}
