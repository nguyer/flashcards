let frontContent;
let backContent;
let front;
let back;
let settingsPanel;

const flip = (showFront) => {
  if (showFront && !deckFlipped) {
    // flip to the front
    front.style.display = "flex";
    back.style.display = "none";
  } else if (showFront) {
    // flip to the back
    front.style.display = "none";
    back.style.display = "flex";
  } else if (front.style.display == "flex") {
    // flip to the back
    front.style.display = "none";
    back.style.display = "flex";
  } else {
    // flip to the front
    front.style.display = "flex";
    back.style.display = "none";
  }
};

let cards = [
  {
    front: {
      text: "uno",
    },
    back: {
      text: "one",
    },
  },
  {
    front: {
      text: "dos",
    },
    back: {
      text: "two",
    },
  },
  {
    front: {
      text: "tres",
    },
    back: {
      text: "three",
    },
  },
];

let indexes = Array.from(Array(cards.length).keys());
let index = 0;
let deckFlipped = false;

const changeCard = (offset) => {
  index = (index + offset) % cards.length;
  if (index < 0) {
    index = cards.length + index;
  }
  window.localStorage.setItem("index", index.toString());

  flip(true);

  frontContent.textContent = cards[indexes[index]].front.text;
  frontContent.style.fontSize = cards[indexes[index]].front.fontSize || "10vw";
  backContent.textContent = cards[indexes[index]].back.text;
  backContent.style.fontSize = cards[indexes[index]].back.fontSize || "10vw";
};

const toggleSettings = () => {
  if (settingsPanel.style.display == "none") {
    settingsPanel.style.display = "flex";
  } else {
    settingsPanel.style.display = "none";
  }
};

const loadCards = (e) => {
  var files = document.getElementById("selectFiles").files;
  console.log(files);
  if (files.length <= 0) {
    return;
  }

  var fr = new FileReader();

  fr.onload = function (e) {
    cards = JSON.parse(e.target.result);
    indexes = Array.from(Array(cards.length).keys());
    window.localStorage.setItem("cards", e.target.result);
    window.localStorage.setItem("indexes", indexes);
    index = 0;
    changeCard(0);
    toggleSettings();
  };

  fr.readAsText(files.item(0));
};

const loadCSV = (e) => {
  var files = document.getElementById("selectCSV").files;
  console.log(files);
  if (files.length <= 0) {
    return;
  }

  var fr = new FileReader();

  fr.onload = function (e) {
    const lines = e.target.result.split("\n");
    cards = new Array(lines.length);
    indexes = Array.from(Array(cards.length).keys());
    for (let i = 0; i < lines.length; i++) {
      const sides = lines[i].split(",");
      cards[i] = {
        front: { text: sides[0] },
        back: { text: sides[1] },
      };
    }
    window.localStorage.setItem("cards", JSON.stringify(cards));
    window.localStorage.setItem("indexes", JSON.stringify(indexes));
    index = 0;
    changeCard(0);
    toggleSettings();
  };

  fr.readAsText(files.item(0));
};

const init = () => {
  frontContent = document.getElementById("front-content");
  backContent = document.getElementById("back-content");
  front = document.getElementById("front");
  back = document.getElementById("back");
  settingsPanel = document.getElementById("settingsPanel");
  const savedIndexes = window.localStorage.getItem("indexes");
  if (savedIndexes) {
    indexes = JSON.parse(savedIndexes);
  }
  const savedIndex = window.localStorage.getItem("index");
  if (savedIndex) {
    index = parseInt(savedIndex);
  }
  const savedCards = window.localStorage.getItem("cards");
  if (savedCards) {
    cards = JSON.parse(savedCards);
  }
  const savedDeckFlipped = window.localStorage.getItem("deckFlipped");
  if (savedDeckFlipped) {
    deckFlipped = JSON.parse(deckFlipped);
  }
  changeCard(0);
};

const shuffleIndexes = () => {
  let currentIndex = cards.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [indexes[currentIndex], indexes[randomIndex]] = [
      indexes[randomIndex],
      indexes[currentIndex],
    ];
  }
  toggleSettings();
};

const restoreOriginalOrder = () => {
  indexes = Array.from(Array(cards.length).keys());
  window.localStorage.setItem("deckFlipped", JSON.stringify(indexes));
};

const flipDeck = () => {
  deckFlipped = !deckFlipped;
  window.localStorage.setItem("deckFlipped", JSON.stringify(deckFlipped));
  flip();
  toggleSettings();
};
