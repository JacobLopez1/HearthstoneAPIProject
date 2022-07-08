const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7c5996bba2msh726006bfc80dfb6p18749fjsn6825db7901b8",
    "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
  },
};

let activeSort = "MANA_LOW_TO_HIGH";
let activeMana = "NONE";
let activeSet = "voyage-to-the-sunken-city";
let activeClass = "NONE";
const cardsWrapper = document.querySelector(".card__search--list");
console.log(cardsWrapper)

async function getCards() {
  // Get All collectible cards in the Set
  const cards = await fetch(
    `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/%7B${activeSet}%7D`,
    options
  );
  const cardsData = await cards.json();
  console.log(cardsData);
  cardsDataCollectible = cardsData.filter((card) => card.collectible);
  console.log(cardsDataCollectible)

  // Get Cards after Mana and Class Filters
  if (activeMana === 'seven-up') {
    cardsDataMana = cardsDataCollectible.filter(
        (card) => card.cost >= 7
    );
  }
  else if (activeMana != "NONE") {
    cardsDataMana = cardsDataCollectible.filter(
      (card) => card.cost === activeMana
    );
  } 
  else {
    cardsDataMana = cardsDataCollectible;
  }

  console.log(cardsDataMana)

  if (activeClass != "NONE") {
    cardsDataClass = cardsDataMana.filter(
      (card) => card.playerClass === activeClass
    );
  } else {
    cardsDataClass = cardsDataMana;
  }

  // Sort Cards by Mana Cost
  if (activeSort === "MANA_LOW_TO_HIGH") {
    cardsDataClass.sort((a, b) => a.cost - b.cost);
  }
  else if (activeSort === "MANA_HIGH_TO_LOW") {
    cardsDataClass.sort((a,b) => b.cost - a.cost);
  }
  else if (activeSort === "NAME_A_TO_Z"){
    cardsDataClass.sort((a, b) => a.name.localeCompare(b.name))
  }
  else {
    cardsDataClass.sort((a, b) => b.name.localeCompare(a.name))
  }

  console.log(cardsDataClass);
  return cardsDataClass;
}

async function renderCards() {
  const activeCards = await getCards()
  console.log(activeCards)
  const cardSetHTML = activeCards.map(card => cardHTML(card)).join("")
  console.log(cardSetHTML)
  cardsWrapper.innerHTML = cardSetHTML;
}

renderCards();

function cardHTML(card){
    return `
    <div class="card__wrapper">
        <img src="${card.img}" class="card__img">
        <p class="card__text">${card.flavor}</p>
    </div>`
}

function classChange(event) {
    activeClass = event.target.value
    renderCards();
}

function sortChange(event) {
    activeSort = event.target.value
    renderCards();
}

function setChange(event) {
    activeSet = event.target.value
    renderCards();
}

function manaChange(mana) {
    activeMana = mana
    renderCards();
}