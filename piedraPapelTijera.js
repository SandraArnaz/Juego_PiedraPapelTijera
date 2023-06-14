// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

//Para rescatar numero de partidas totales y el nombre
var numeroPartidas = document.getElementsByTagName("input")[1];
var nombre = document.getElementsByTagName("input")[0];

//Array de imagenes presentes para modificar
var opcion = document.getElementsByTagName("img");

// Variable para almacenar la partida actual
var partidaActual;

//Tiradas de los jugadores
var tiradaJugador;
var tiradaOrdenador;

//Rescatar donde vamos a escribir historial de partida
var escribirHistorial = document.getElementById("historial");

//Comprobar si el nombre cumple con los requisitos 
function comprobarNombre(){
    //Expresion regular comprueba requisitos
    const patronNombre = /^[a-zA-Z][0-9A-Za-z]{3,}/;
    
    if (patronNombre.test(nombre.value)) {
        nombre.classList.remove("fondoRojo");
        return true;
    //Si no lo cumple le pone el fondo rojo
    } else {
        nombre.classList.add("fondoRojo");
        return false;
    }
}

//Comprobar si el número de partida cumple con los requisitos 
function comprobarPartida(){
    //Expresion regular comprueba requisitos
    const patronPartidas = /^[1-9]+/;

    if (patronPartidas.test(numeroPartidas.value)) {
        numeroPartidas.classList.remove("fondoRojo");
        return true;
    //Si no lo cumple le pone el fondo rojo
    } else {
        numeroPartidas.classList.add("fondoRojo");
        return false;
    }

}

// Clase Partida donde tenemos la información para poder jugarla
class Partida {

    constructor(){
        this.opcionJugador = "";
        this.opcionOrdenador = "";
        this.ganador = "";
        this.partidasJugadas = 0;
        this.partidaEmpezada = false;
    }

    jugarPartida(){
        // Si no estaba empezada la partida, se empieza
        if (!this.partidaEmpezada) {
            this.partidaEmpezada = true;
        }

        //Asignamos los valores e incrementamos la variable partidasJugadas
        this.opcionJugador = tiradaJugador;
        this.opcionOrdenador = tiradaOrdenador;
        this.partidasJugadas++;

        //Mostrar en el HTML en que partida se encuentra
        document.getElementById("actual").innerHTML = this.partidasJugadas;

    }

    //Devuelve el ganador
    getGanador(){
        if(this.opcionJugador == posibilidades[0] && this.opcionOrdenador == posibilidades[2]) {
            return "JUGADOR";
        } else if(this.opcionOrdenador == posibilidades[0] && this.opcionJugador == posibilidades[2]) {
            return "MAQUINA";
        } else {
            //Lo que esta en la posicion I ganas a lo que esta en la posicion I-1
            for(let i=0; i<posibilidades.length; i++) {
                if(this.opcionJugador == posibilidades[i] && this.opcionOrdenador  == posibilidades[i-1]) {
                    return "JUGADOR";
                } else if(this.opcionOrdenador == posibilidades[i] && this.opcionJugador == posibilidades[i]) {
                    return "EMPATE";
                } else if (this.opcionOrdenador == posibilidades[i] && this.opcionJugador == posibilidades[i-1]) {
                    return "MAQUINA";
                }
            }
        }
    }

    //Devuelve si la partida ha finalizado porque ha llegado al tope de partidas elegidas
    finDePartida(){
        return this.partidasJugadas == numeroPartidas.value;
    }
}

//Empieza la partida asignadole las imagenes de piedra,papel y tijera --> Crea la partida
function empezarPartida(cNombre,cPartida){
    if(cNombre == true && cPartida == true){
        document.getElementById("total").innerHTML = numeroPartidas.value;
        opcion[0].src = "img/piedraJugador.png";
        opcion[1].src = "img/papelJugador.png";
        opcion[2].src = "img/tijeraJugador.png";

        partidaActual = new Partida();
    }
}

//Recoge en que opcion se ha hecho click y le asigna el valor a la variable
function opcionElegidaJugador(opcionMarcada){

    switch(opcionMarcada) {
        case "piedra":
            tiradaJugador = posibilidades[0];
            break;
        case "papel":
            tiradaJugador = posibilidades[1];
            break;
        case "tijera":
            tiradaJugador = posibilidades[2];
            break;   
    }

}


function opcionElegidaMaquina(){
    //Saca valor aleatorio
    var tirada = Math.floor(Math.random() * 3);

    //Segun el valor aleatorio que sea le asigna una imagen distinta y el valor que corresponde
    switch(tirada) {
        case 0:
            tiradaOrdenador = posibilidades[0];
            opcion[3].src = "img/piedraOrdenador.png";
            break;
        case 1:
            tiradaOrdenador = posibilidades[1];
            opcion[3].src = "img/papelOrdenador.png";
            break;
        case 2:
            tiradaOrdenador = posibilidades[2];
            opcion[3].src = "img/tijeraOrdenador.png";
            break;   
    }

}


// Listener para el botón de JUGAR
document.getElementsByTagName("button")[0].addEventListener("click", function () {
    var cNombre = comprobarNombre();
    var cPartida = comprobarPartida();
    empezarPartida(cNombre,cPartida);
})

// Listener para cuando hace click en imagen de piedra
opcion[0].addEventListener("click", function () {
    //Si la opcion de piedra tiene el estilo de noSeleccionado se lo ponemos
    //Se lo quitamos al resto
    if(opcion[0].className = "noSeleccionado"){
        opcion[0].className = "seleccionado";
        opcion[1].className = "noSeleccionado";
        opcion[2].className = "noSeleccionado";
    }
    //Llama a la funcion pasandole  la opcion que se ha seleccionado
    opcionElegidaJugador("piedra");
        
})

// Listener para cuando hace click en imagen de papel
opcion[1].addEventListener("click", function () {
    //Si la opcion de papel tiene el estilo de noSeleccionado se lo ponemos
    //Se lo quitamos al resto
    if(opcion[1].className = "noSeleccionado"){
        opcion[1].className = "seleccionado";
        opcion[0].className = "noSeleccionado";
        opcion[2].className = "noSeleccionado";
    }
    //Llama a la funcion pasandole  la opcion que se ha seleccionado
    opcionElegidaJugador("papel");
      
})

// Listener para cuando hace click en imagen de tijera
opcion[2].addEventListener("click", function () {
    //Si la opcion de tijera tiene el estilo de noSeleccionado se lo ponemos
    //Se lo quitamos al resto
    if(opcion[2].className = "noSeleccionado"){
        opcion[2].className = "seleccionado";
        opcion[1].className = "noSeleccionado";
        opcion[0].className = "noSeleccionado";
    }
    //Llama a la funcion pasandole  la opcion que se ha seleccionado
    opcionElegidaJugador("tijera");
      
})

// Listener para el botón de YA
document.getElementsByTagName("button")[1].addEventListener("click", function () {

    // Si no es fin de partida jugamos la siguiente
    if (!partidaActual.finDePartida()) {
        opcionElegidaMaquina();
        partidaActual.jugarPartida();
        
        // Mostramos el resultado de la partida actual en funcion de quien gane
        switch(partidaActual.getGanador()){
            case "JUGADOR":
                escribirHistorial.innerHTML += "<li>GANA " + nombre.value + "</li>";
                break;
            case "MAQUINA":
                escribirHistorial.innerHTML += "<li>GANA LA MAQUINA</li>";
                break;
            case "EMPATE":
                escribirHistorial.innerHTML += "<li>EMPATE</li>";
                break;
        }
      
      
    }
})

// Listener para el botón de RESET
//Pone todos los valores a 0 para volver a empezar
document.getElementsByTagName("button")[2].addEventListener("click", function () {
    partidaActual = null;
    numeroPartidas.value = 0;
    partidasJugadas = 0;
    document.getElementById("actual").innerHTML = 0;
    document.getElementById("total").innerHTML = 0;
    escribirHistorial.innerHTML += "<li>EMPIEZA NUEVA PARTIDA</li>";
    opcion[3].src = "img/defecto.png";
    
    
})








