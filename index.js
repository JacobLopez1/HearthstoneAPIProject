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
let lastId = "*";
let activeSearch = "NONE";
const cardsWrapper = document.querySelector(".card__search--list");
const loading = document.querySelector(".loading-state");
const noResult = document.querySelector(".no-results");

async function getCards() {
  // Get All collectible cards in the Set
  try {
    let cards = await fetch(
      `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/%7B${activeSet}%7D/`,
      options
      );
      if (activeSearch != "NONE") {
        cards = await fetch(
          `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${activeSearch}`,
          options
          ).catch(
            (err) => console.error(err)
            );
      }
    const cardsData = await cards.json();
    cardsDataCollectible = cardsData.filter((card) => card.collectible);
  }
  catch(err) {
    noResult.classList.remove("not-loading")
    (loading.classList += " not-loading")
    console.error(err)
  }

  // Get Cards after Mana and Class Filters
  if (activeMana === "seven-up") {
    cardsDataMana = cardsDataCollectible.filter((card) => card.cost >= 7);
  } else if (activeMana != "NONE") {
    cardsDataMana = cardsDataCollectible.filter(
      (card) => card.cost === activeMana
    );
  } else {
    cardsDataMana = cardsDataCollectible;
  }

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
  } else if (activeSort === "MANA_HIGH_TO_LOW") {
    cardsDataClass.sort((a, b) => b.cost - a.cost);
  } else if (activeSort === "NAME_A_TO_Z") {
    cardsDataClass.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    cardsDataClass.sort((a, b) => b.name.localeCompare(a.name));
  }

  return cardsDataClass;
}

async function renderCards() {
  noResult.classList += " not-loading";
  loading.classList.remove("not-loading");
  cardsWrapper.classList += " not-loading";
  const activeCards = await getCards();
  loading.classList += " not-loading";
  cardsWrapper.classList.remove("not-loading");
  const cardSetHTML = activeCards.map((card) => cardHTML(card)).join("");
  cardsWrapper.innerHTML = cardSetHTML;
}

renderCards();

function cardHTML(card) {
  return `
    <div class="card__wrapper">
        <img src="${card.img}" class="card__img">
        <p class="card__text">${card.flavor}</p>
    </div>`;
}

function classChange(event) {
  activeSearch = "NONE";
  activeClass = event.target.value;
  renderCards();
}

function sortChange(event) {
  activeSearch = "NONE";
  activeSort = event.target.value;
  renderCards();
}

function setChange(event) {
  activeSearch = "NONE";
  activeSet = event.target.value;
  renderCards();
}

function manaChange(mana) {
  activeSearch = "NONE";
  activeMana = mana;
  renderCards();
}

function searchChange(event) {
  activeSearch = event.target.value;
  renderCards();
}

function toggleActive(id) {
  if (lastId != "NONE") {
    document.getElementById(lastId).classList += " not-active";
  }
  document.getElementById(id).classList.remove("not-active");
  lastId = id;
}
