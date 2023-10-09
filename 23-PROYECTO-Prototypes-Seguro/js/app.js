function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case "1":
            cantidad = base * 1.20;
            break;
        case "2":
            cantidad = base * 1.10;
            break;
        case "3":
            cantidad = base * 1.45;
            break;
            case "4":
                cantidad = base * 1.60;
                break;
                case "5":
                    cantidad = base * 1.70;
                    break;
                    case "6":
                        cantidad = base * 1.00;
                        break;
        default:
            break;
    }
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3 ) * cantidad ) / 100;
    if (this.tipo === "basico") {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50; 
    }
    return cantidad;
};

function UI() {}

UI.prototype.llenarOpciones = function() {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector("#year");
    for(let i = max; i > min; i-- ) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option); 
    }
};

UI.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement("div");
    if(tipo === "error" ) {
        div.classList.add("mensaje", "error");
    } else {
        div.classList.add("mensaje", "correcto");
    }
    div.textContent = mensaje;

    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    }, 1500);
};

UI.prototype.mostrarResultado = function(total, seguro) {
    const {marca, year, tipo} = seguro;
    const div = document.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total:<pan class="font-normal"> $ ${total} </span></p>
    `;
    const resultadoDiv = document.querySelector("#resultado");
  
    

    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display = "none";
        resultadoDiv.appendChild(div);
    }, 1500);
};

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones();
    EventListener();
});

function EventListener() {
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    const marca = document.querySelector("#marca").value;
    const year = document.querySelector("#year").value;
    const tipo = document.querySelector(`input[name="tipo"]:checked`).value;
    
    if(marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }
    
    ui.mostrarMensaje("Cotizando...", "exito");
    const resultados = document.querySelector("#resultado div");
    if(resultados != null) {
        resultados.remove();
    }
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    ui.mostrarResultado(total, seguro);
}