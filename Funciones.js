/**
 * Descripción de que hace la función
 * @method Nombre de la función
 * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
 * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
function textoAMorse() {
    // Obtiene el texto ingresado por el usuario desde el textarea
    const texto = document.getElementById("texto").value;

    // Define el diccionario de letras y números en código Morse
    const morse = {
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
        V: "...-",
        W: ".--",
        X: "-..-",
        Y: "-.--",
        Z: "--..",
        0: "-----",
        1: ".----",
        2: "..---",
        3: "...--",
        4: "....-",
        5: ".....",
        6: "-....",
        7: "--...",
        8: "---..",
        9: "----."
    };

    // Convierte el texto a mayúsculas y separa las letras
    const letras = texto.toUpperCase().split("");

    // Traduce cada letra o número a su equivalente en código Morse
    const morseArray = letras.map(letra => {
        if (letra === " ") {
            return "/";
        } else {
            return morse[letra] || "";
        }
    });

    // Une los elementos del array con un espacio entre cada código Morse
    const resultado = morseArray.join(" ");

    // Muestra el resultado en el span con el id "resultado"
    document.getElementById("resultado").textContent = resultado;
}