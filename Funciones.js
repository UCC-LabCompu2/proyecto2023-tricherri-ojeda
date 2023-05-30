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
/**
 * Descripción de que hace la función
 * @method Nombre de la función
 * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
 * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
function copiarContenidoSpan() {
    // Obtener el elemento <span> por su id
    var span = document.getElementById('resultado');

    // Crear un elemento temporal para almacenar el contenido
    var tempElement = document.createElement('textarea');
    tempElement.value = span.textContent;

    // Añadir el elemento temporal al documento
    document.body.appendChild(tempElement);

    // Seleccionar el contenido del elemento temporal
    tempElement.select();
    tempElement.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el contenido al portapapeles utilizando el API del portapapeles
    navigator.clipboard.writeText(tempElement.value)
        .then(function() {
            console.log('Contenido copiado al portapapeles');
        })
        .catch(function(error) {
            console.error('Error al copiar el contenido: ', error);
        });

    // Remover el elemento temporal del documento
    document.body.removeChild(tempElement);
}