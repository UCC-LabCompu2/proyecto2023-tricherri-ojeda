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

    const morseArray = letras.map((letra, index) => {
        if (letra === " " && index === 0) {
            return "";
        } else if (letra === " ") {
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
    const span = document.getElementById('resultado');

    const tempElement = document.createElement('textarea');
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
    const resultado = document.getElementById("resultado").textContent.trim();
    const duracionPunto = 300;
    const audioContext = new (window.AudioContext)();
    const oscilador = audioContext.createOscillator();
    oscilador.type = "sine";
    oscilador.frequency.value = 700;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0;

    oscilador.connect(gainNode);
    gainNode.connect(audioContext.destination);

    let tiempoActual = audioContext.currentTime;

    let puntos = 0;
    let guiones = 0;
    let espacios = 0;

    for (let i = 0; i < resultado.length; i++) {
        if (resultado[i] === ".") {
            puntos++;
            gainNode.gain.setValueAtTime(1, tiempoActual);
            tiempoActual += duracionPunto / 1000;
            gainNode.gain.setValueAtTime(0, tiempoActual);
        } else if (resultado[i] === "-") {
            guiones++;
            gainNode.gain.setValueAtTime(1, tiempoActual);
            tiempoActual += (duracionPunto * 3) / 1000;
            gainNode.gain.setValueAtTime(0, tiempoActual);
        } else if (resultado[i] === " ") {
            espacios++;
            tiempoActual += (duracionPunto * 3) / 3000;
        }
        tiempoActual += (duracionPunto) / 1000;
    }

    oscilador.start();
    oscilador.stop(tiempoActual);

    const tiempoTotal = tiempoActual * 1000; // Convertir a milisegundos
    const tiempoEspera = tiempoTotal + 1000; // Agregar 1 segundo de tiempo de espera

    setTimeout(() => {
        funcionDespuesDeTiempo(puntos, guiones, espacios);
    }, tiempoEspera);
}
function funcionDespuesDeTiempo(puntos, guiones, espacios) {
    console.log("Función llamada después del tiempo de reproducción:");
    console.log("Cantidad de puntos:", puntos);
    console.log("Cantidad de guiones:", guiones);
    console.log("Cantidad de espacios:", espacios);

    // Limpia el contenido del canvas después de otro tiempo específico
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');



    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 0);
}
/**
 * Borra el contenido del canvas
 * @method borrarCanvas
 */
let borrarCanvas = () =>{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 * Dibuja las ondas sobre el canvas
 * @method dibujarOndas
 */
let dibujarOndas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const xInicial = 5;
    const xFinal = 50 ;
    let y = 0;

    for (let x = xInicial; x <= xFinal; x += 5) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, canvas.height - y);
        ctx.strokeStyle = "#7ab1f3";
        ctx.lineWidth = 3;
        ctx.stroke();
        y=y+5;
    }

    y=0;
    const inicioX = 55;
    const finX = 100 ;


    for (let x = inicioX; x <= finX; x += 5) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, canvas.height - y);
        ctx.strokeStyle = "#7ab1f3";
        ctx.lineWidth = 3;
        ctx.stroke();
        y=y+5;
    }
}

/*Tiempo
const displayTime = contadorPuntos*300 + (contadorEspacios*900)/3000 + (contadorLineas*900)/1000 ; // 2 segundos

// Borra el contenido del canvas después del tiempo determinado
setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}, displayTime);
*/

