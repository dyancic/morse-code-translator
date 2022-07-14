const morseCodeKey = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    " ": " / ",
};

const output = document.querySelector(".output");
const inputText = document.querySelector(".input");
const buttonBox = document.querySelector(".button-box");
const morseButtons = document.querySelectorAll(".button-box__button");
let toggle = false;

document.getElementById("switch").addEventListener("change", (event) => {
    toggle = event.target.checked;
    output.classList.toggle("output--bold");
    buttonBox.classList.toggle("button-box--hiding");
    inputText.value = "";
    output.innerText = "";
    console.log(toggle);
});

//reads the input
inputText.addEventListener("input", (event) => {
    console.log(event.target.value);
    //need to only allow certain inputs
    if (!toggle) {
        event.target.value = event.target.value.replace(/[^a-zA-Z' ]/, "");
        updateDom(output, translate(event.target.value, morseCodeKey, toggle));
    } else {
        event.target.value = event.target.value.replace(/[^-/. ]/, "");
        updateDom(output, translate(event.target.value, morseCodeKey, toggle));
    }
});

morseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        inputText.value += button.value;
        updateDom(output, translate(inputText.value, morseCodeKey, toggle));
    });
});

const translate = (toTranslate, referenceArray, bool) => {
    if (!bool) {
        const arr = toTranslate.toUpperCase().split("");
        return arr.map((char) => referenceArray[char]).join(" ");
    } else {
        const arr = toTranslate.split(" ");
        return arr
            .map((morse) => {
                return Object.keys(referenceArray).find(
                    (key) => referenceArray[key] === morse,
                );
            })
            .join("");
    }
};

const updateDom = (element, value) => {
    element.innerText = value;
};
