import { updateDom, translate } from "./functions.js";
import morseCodeKey from "./data.js";

const output = document.querySelector(".output");
const inputText = document.querySelector(".input");
const buttonBox = document.querySelector(".button-box");
const morseButtons = document.querySelectorAll(".button-box__button");
const pinkNoise = document.getElementById("noise");
const switchNoise = document.getElementById("switched");
let toggle = false;
pinkNoise.loop = true;
morseButtons.forEach((button) => (button.disabled = true));

//english to morse switch
document.getElementById("switch").addEventListener("change", (event) => {
    toggle = event.target.checked;
    morseButtons.forEach((button) => (button.disabled = !toggle));
    output.classList.toggle("output--bold");
    buttonBox.classList.toggle("button-box--hiding");
    const savedInput = inputText.value;
    inputText.value = output.innerText;
    output.innerText = savedInput;
    switchNoise.currentTime = 0;
    switchNoise.play();
    toggle ? pinkNoise.play() : pinkNoise.pause();
});

//reads the input
inputText.addEventListener("input", (event) => {
    let input = event.target.value;
    if (!toggle) {
        event.target.value = input.replace(/[^0-9a-zA-Z' ]/, "");
        updateDom(
            ".output",
            translate(event.target.value, morseCodeKey, toggle),
        );
    } else {
        event.target.value = input.replace(/[^-./ ]/, "");
        updateDom(
            ".output",
            translate(event.target.value, morseCodeKey, toggle),
        );
    }
});

//buttons on screen
morseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const audio = document.querySelector(`audio[value="${button.value}"]`);
        button.value === "/"
            ? (inputText.value += " / ")
            : button.value === "Backspace"
            ? (inputText.value = inputText.value.slice(0, -1))
            : (inputText.value += button.value);
        inputText.scrollLeft = inputText.scrollWidth;
        updateDom(".output", translate(inputText.value, morseCodeKey, toggle));
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    });
});

window.addEventListener("keydown", (event) => {
    inputText.focus();

    if (!toggle) return;
    const audio = document.querySelector(`audio[value="${event.key}"]`);
    const button = document.querySelector(`button[value="${event.key}"]`);

    if (button) {
        button.classList.add("button-active");
        morseButtons.forEach((key) => {
            key.addEventListener("transitionend", (e) => {
                e.target.classList.remove("button-active");
            });
        });
    }

    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
});
