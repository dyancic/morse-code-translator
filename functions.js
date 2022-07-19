export const translate = (toTranslate, referenceArray, bool) => {
    if (!bool) {
        const arr = toTranslate.split("");
        return arr.map((char) => referenceArray[char.toUpperCase()]).join(" ");
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

export const updateDom = (element, value) => {
    document.querySelector(element).innerText = value;
};
