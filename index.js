const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", ".", ",", "?", "!", "'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];

const indexToChar = {...characters};
const charToIndex = characters.reduce((prev, curr, index) => ({...prev, [curr]: index}), {});

console.log("charToIndex: ", charToIndex);

const encryptMessage = () => {
    let result = "";

    const message = document.getElementById("message").value.toUpperCase();
    const key = document.getElementById("key").value.toUpperCase();

    for (let i = 0; i < message.length; ++i) {
        const value = charToIndex[message[i]] + charToIndex[key[i % key.length]];
        if (isNaN(value)) {
            document.getElementById("result").innerHTML = "error: invalid characters";
            return;
        }
        result += indexToChar[value < characters.length ? value : value - characters.length];
    }

    document.getElementById("result").innerHTML = result;
    document.getElementById("result").className = "visible";
}

const decryptMessage = () => {
    let result = "";

    const message = document.getElementById("message").value.toUpperCase();
    const key = document.getElementById("key").value.toUpperCase();

    for (let i = 0; i < message.length; ++i) {
        const value = charToIndex[message[i]] - charToIndex[key[i % key.length]];
        result += indexToChar[value >= 0 ? value : characters.length + value];
    }

    document.getElementById("result").innerHTML = result;
    document.getElementById("result").className = "visible";
}

const toggleState = () => {
    const checked = document.getElementById("state").checked;
    document.getElementById("encryptBtn").onclick = checked ? encryptMessage : decryptMessage;
    document.getElementById("title").innerHTML = checked ? "EncryptR" : "DecryptR";
    document.getElementById("encryptBtn").innerHTML = checked ? "Encrypt" : "Decrypt";
    document.getElementById("encryptBtn").className = checked ? "delay-animation" : "delay-animation decrypt";
    setTimeout(() => {
        document.getElementById("encryptBtn").className = checked ? "" : "decrypt";
    }, 800);
    document.getElementById("result").className = "hidden";
}

const copyResult = () => {
    navigator.clipboard.writeText(document.getElementById("result").innerHTML.toLowerCase());
    document.getElementById("result").className = "hidden";
}
