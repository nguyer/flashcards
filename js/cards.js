let frontContent;
let backContent;
let front;
let back;
let settingsPanel;

const flip = (showFront) => {
  if (showFront || front.style.display == "none") {
    front.style.display = "flex";
    back.style.display = "none";
  } else {
    front.style.display = "none";
    back.style.display = "flex";
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

let index = 0;
const changeCard = (offset) => {
  index = (index + offset) % cards.length;
  if (index < 0) {
    index = cards.length + index;
  }
  window.localStorage.setItem("index", index.toString());

  flip(true);

  frontContent.innerText = cards[index].front.text;
  frontContent.style.fontSize = cards[index].front.fontSize || "20vw";
  backContent.innerText = cards[index].back.text;
  backContent.style.fontSize = cards[index].back.fontSize || "20vw";
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
    window.localStorage.setItem("cards", e.target.result);
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
  const savedIndex = window.localStorage.getItem("index");
  if (savedIndex) {
    index = parseInt(savedIndex);
  }
  const savedCards = window.localStorage.getItem("cards");
  if (savedCards) {
    cards = JSON.parse(savedCards);
  }
  changeCard(0);
};
