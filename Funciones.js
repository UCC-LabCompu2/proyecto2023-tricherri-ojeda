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

    const morseArray = letras.map((letra, i) => {
        if (letra === " " && i === 0) {
            return "";
        } else if (letra === " ") {
            return "/";
        } else if (letra.match(/^[A-Z0-9]+$/)) {
            return morse[letra];
        } else {
            return null;
        }
    });

    if (morseArray.includes(null)) {
        openDialog();
    } else {
        document.getElementById("resultado").textContent = morseArray.join(" ");
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
    const texto = document.getElementById('resultado').textContent;

    navigator.clipboard.writeText(texto);

}

/**
 * Reproduce el codigo morse
 * @method reproducir
 */
let reproducir = () => {
    const resultado = document.getElementById("resultado").textContent.trim();
    const contexto = new AudioContext();
    const oscilador = contexto.createOscillator();
    oscilador.type = "sine";
    oscilador.frequency.value = 700;

    const nodoGan = contexto.createGain();
    nodoGan.gain.value = 0;

    oscilador.connect(nodoGan);
    nodoGan.connect(contexto.destination);

    let tiempoActual = contexto.currentTime;

    let puntos = 0;
    let guiones = 0;
    let espacios = 0;

    const duracionPunto = 300;

    for (let i = 0; i < resultado.length; i++) {
        if (resultado[i] === ".") {
            puntos++;
            nodoGan.gain.setValueAtTime(1, tiempoActual);
            tiempoActual += duracionPunto / 1000;
            nodoGan.gain.setValueAtTime(0, tiempoActual);
        } else if (resultado[i] === "-") {
            guiones++;
            nodoGan.gain.setValueAtTime(1, tiempoActual);
            tiempoActual += (duracionPunto * 3) / 1000;
            nodoGan.gain.setValueAtTime(0, tiempoActual);
        } else if (resultado[i] === " ") {
            espacios++;
            tiempoActual += (duracionPunto * 3) / 3000;
        }
        tiempoActual += (duracionPunto) / 1000;
    }

    oscilador.start();
    oscilador.stop(tiempoActual);

    const tiempoTotal = tiempoActual * 1000;

    setTimeout(() => {
        borrarCanvas();
    }, tiempoTotal);
    setTimeout(() => {
        clearInterval(animacion);
    }, tiempoTotal);
}
/**
 * Borra el contenido del canvas
 * @method borrarCanvas
 */
let borrarCanvas = () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

/**
 * Animación de las ondas sobre el canvas
 * @method animacionOndas
 */


const dx = 1;
let animacion;
let animacionOndas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let img = new Image();
    img.src = "Imágenes/Onda.jpg";

    let x = -460;

    animacion = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, -35);

        x += dx;

        if (x > canvas.width) {
            x = -460;
        }
    }, 20);
}

