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
    " ": "/",
};

const output = document.querySelector(".output");
const inputText = document.querySelector(".input");
let toggle = false;
let input = "";

document.getElementById("switch").addEventListener("change", (event) => {
    toggle = event.target.checked;
    output.classList.toggle("output--bold");
    input = "";
    inputText.value = "";
    output.innerText = "";
    console.log(toggle);
});

inputText.addEventListener("input", (event) => {
    console.log(event.target.value);
    //need to only allow certain inputs
    if (!toggle) {
        event.target.value = event.target.value.replace(/[^a-zA-Z' ]/, "");
        console.log(input);
        updateDom(output, translate(event.target.value, morseCodeKey));
    } else {
        event.target.value = event.target.value.replace(/[^-/. ]/, "");
        input = event.target.value;
    }
});

document.addEventListener("keypress", (event) => {
    if ((event.code === "Space" || event.code === "Backspace") && toggle) {
        updateDom(output, translate(input, morseCodeKey));
        console.log("am i working");
    }
});

const translate = (toTranslate, referenceArray) => {
    if (!toggle) {
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
