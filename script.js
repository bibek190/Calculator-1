const btns = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");

let stringToDisplay = "";
const operators = ["+", "-", "*", "/", "%"];
let lastOperator = "";

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;
    displayElm.classList.remove("prank");

    if (operators.includes(val)) {
      lastOperator = val;
      const lastChar = stringToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }
    }

    if (val === "AC") {
      stringToDisplay = "";
      return display(stringToDisplay);
    }
    if (val === "C") {
      stringToDisplay = stringToDisplay.slice(0, -1);
      return display(stringToDisplay);
    }
    if (val === "=") {
      const lastChar = stringToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }
      return total();
    }

    if (val === ".") {
      // find index of last operator
      const lastOperatorIndex = stringToDisplay.lastIndexOf(lastOperator);

      const lastNumberSet = stringToDisplay.slice(lastOperatorIndex);

      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && stringToDisplay.includes(".")) {
        return;
      }
    }

    stringToDisplay += val;
    display(stringToDisplay);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  const prankVal = randomNum();
  if (prankVal) {
    displayElm.classList.add("prank");
  }
  const ttl = eval(stringToDisplay) + prankVal;
  stringToDisplay = ttl.toString();
  displayElm.innerText = ttl;
};

const randomNum = () => {
  const num = Math.floor(Math.random() * 10);
  return num <= 3 ? num : 0;
};
