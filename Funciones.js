/**
 * Realiza la traducción de texto a morse.
 * @method textoAMorse
 */
let textoAMorse = () => {
    const texto = document.getElementById("texto").value;
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
    const letras = texto.toUpperCase().split("");

    const morseArray = letras.map(letra => {
        if (letra === " ") {
            return "/";
        } else if (letra.match(/^[A-Z0-9]+$/)) {
            return morse[letra] || "";
        } else {
            return null;
        }
    });

    if (morseArray.includes(null)) {
        openDialog();
    } else {

        const resultado = morseArray.join(" ");

        document.getElementById("resultado").textContent = resultado;
    }
}
/**
 * Cierra el dialog de la alerta de error de caracteres ingresados.
 * @method cerrarDialog
 */
let cerrarDialog = () => {
    const dialog = document.getElementById("myDialog");
    dialog.close();
}
/**
 * Abre el dialog de la alerta de error de caracteres ingresados
 * @method openDialog
 */
let openDialog = () => {
    const dialog = document.getElementById("myDialog");
    dialog.showModal();
}
/**
 * Copia el código morse.
 * @method copiar
 */
let copiar = () => {
    var span = document.getElementById('resultado');

    var tempElement = document.createElement('textarea');
    tempElement.value = span.textContent;

    document.body.appendChild(tempElement);

    tempElement.select();
    tempElement.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(tempElement.value)
        .then(function() {
            console.log('Contenido copiado al portapapeles');
        })
        .catch(function(error) {
            console.error('Error al copiar el contenido: ', error);
        });

    document.body.removeChild(tempElement);
}

/**
 * Reproduce el codigo morse
 * @method reproducir
 */
let reproducir = () => {
    var resultado = document.getElementById("resultado").textContent.trim();
    var duracionPunto = 300;
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var oscilador = audioContext.createOscillator();
    oscilador.type = "sine";
    oscilador.frequency.value = 700;

    var gainNode = audioContext.createGain();
    gainNode.gain.value = 0;

    oscilador.connect(gainNode);
    gainNode.connect(audioContext.destination);

    var tiempoActual = audioContext.currentTime;

    for (var i = 0; i < resultado.length; i++) {
        if (resultado[i] === ".") {
            gainNode.gain.setValueAtTime(1, tiempoActual);
            tiempoActual += duracionPunto / 1000;
            gainNode.gain.setValueAtTime(0, tiempoActual);
        } else if (resultado[i] === "-") {
            gainNode.gain.setValueAtTime(1, tiempoActual);
            tiempoActual += (duracionPunto * 3) / 1000;
            gainNode.gain.setValueAtTime(0, tiempoActual);
        } else if (resultado[i] === " ") {
            tiempoActual += (duracionPunto * 3) / 1000;
        }
        tiempoActual += (duracionPunto * 1) / 1000;
    }

    oscilador.start();
    oscilador.stop(tiempoActual);
}