const showBack = () => {
  const back = document.getElementById("back");
  back.style.display = "block";
};

const flip = (showFront) => {
  const front = document.getElementById("front");
  const back = document.getElementById("back");
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
  setTimeout(() => {
    window.localStorage.setItem("index", index.toString());
  }, 0);

  flip(true);

  const front = document.getElementById("front-content");
  const back = document.getElementById("back-content");
  front.innerText = cards[index].front.text;
  front.style.fontSize = cards[index].front.fontSize || "20vw";
  back.innerText = cards[index].back.text;
  back.style.fontSize = cards[index].back.fontSize || "20vw";
};

const toggleSettings = () => {
  const settingsPanel = document.getElementById("settingsPanel");
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
