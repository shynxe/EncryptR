const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", ".", ",", "?", "!", "'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];

const indexToChar = {...characters};
const charToIndex = characters.reduce((prev, curr, index) => ({...prev, [curr]: index}), {});

const resultElement = document.getElementById("result");
const messageElement = document.getElementById("message");
const encryptButton = document.getElementById("encryptBtn");
const keyElement = document.getElementById("key");

const encryptMessage = () => {
    let result = "";

    const message = messageElement.value.toUpperCase();
    const key = keyElement.value.toUpperCase();

    for (let i = 0; i < message.length; ++i) {
        const value = charToIndex[message[i]] + charToIndex[key[i % key.length]];
        if (isNaN(value)) {
            resultElement.innerHTML = "error: invalid characters";
            return;
        }
        result += indexToChar[value < characters.length ? value : value - characters.length];
    }

    resultElement.innerHTML = result;
    resultElement.className = "visible";
}

const decryptMessage = () => {
    let result = "";

    const message = messageElement.value.toUpperCase();
    const key = keyElement.value.toUpperCase();

    for (let i = 0; i < message.length; ++i) {
        const value = charToIndex[message[i]] - charToIndex[key[i % key.length]];
        if (isNaN(value)) {
            resultElement.innerHTML = "error: invalid characters";
            return;
        }
        result += indexToChar[value >= 0 ? value : characters.length + value];
    }

    resultElement.innerHTML = result;
    resultElement.className = "visible";
}

const toggleState = () => {
    const checked = document.getElementById("state").checked;
    encryptButton.onclick = checked ? encryptMessage : decryptMessage;
    document.getElementById("title").innerHTML = checked ? "EncryptR" : "DecryptR";
    encryptButton.innerHTML = checked ? "Encrypt" : "Decrypt";
    encryptButton.className = checked ? "delay-animation" : "delay-animation decrypt";
    setTimeout(() => {
        encryptButton.className = checked ? "" : "decrypt";
    }, 800);
    resultElement.className = "hidden";
}

const copyResult = () => {
    navigator.clipboard.writeText(resultElement.innerHTML.toLowerCase());
    resultElement.className = "hidden";
}
