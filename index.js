const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7c5996bba2msh726006bfc80dfb6p18749fjsn6825db7901b8',
		'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
	}
};


async function getClassCards(event) {
    const cards = await fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/%7B${event.target.value}%7D`, options)
    const cardsData = await cards.json();
    console.log(cardsData)
    return cardsData
}

async function renderCards() {
    const cardsWrapper = document.querySelector('.card__search.list');

}

fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/%7Bmage%7D/', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));