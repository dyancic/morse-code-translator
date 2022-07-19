import { updateDom, translate } from "./functions.js";
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
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
};
const morseToEnglish = false;
const englishToMorse = true;

describe("test cases for converting english to morse code and account for spaces, capitals and numbers", () => {
    it("should return a string", () => {
        expect(typeof translate("hello", morseCodeKey, morseToEnglish)).toBe(
            "string",
        );
    });
    it("should convert a word to morse code", () => {
        expect(translate("hello", morseCodeKey, morseToEnglish)).toBe(
            ".... . .-.. .-.. ---",
        );
    });
    it("should account for spaces", () => {
        expect(translate("hello world", morseCodeKey, morseToEnglish)).toBe(
            ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
        );
    });
    it("should translate numbers", () => {
        expect(
            translate("123hello worl9 222 344", morseCodeKey, morseToEnglish),
        ).toBe(
            ".---- ..--- ...-- .... . .-.. .-.. --- / .-- --- .-. .-.. ----. / ..--- ..--- ..--- / ...-- ....- ....-",
        );
    });
    it("should translate capitals", () => {
        expect(translate("HOWDY worlD", morseCodeKey, morseToEnglish)).toBe(
            ".... --- .-- -.. -.-- / .-- --- .-. .-.. -..",
        );
    });
});

describe("test cases for converting morse code to english to match the key", () => {
    it("should return a string", () => {
        expect(
            typeof translate("... --- ...", morseCodeKey, englishToMorse),
        ).toBe("string");
    });
    it("should convert a sentence to english accounting for spaces", () => {
        expect(
            translate(
                "-.-. .... .. -.-. -.- . -. / .-- .. -. --. / - ..- . ... -.. .- -.--",
                morseCodeKey,
                englishToMorse,
            ),
        ).toBe("CHICKEN WING TUESDAY");
    });
    it("add some numbers in there", () => {
        expect(
            translate(
                ".---- ..--- ...-- / .-.. . / ..... / .- ... .---- / ----- ----.",
                morseCodeKey,
                englishToMorse,
            ),
        ).toBe("123 LE 5 AS1 09");
    });
});
